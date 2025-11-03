#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

type RegistryFile = {
  path: string;
  target: string;
  content?: string;
};

type RegistryPayload = {
  files?: RegistryFile[];
};

type ComponentsConfig = {
  aliases?: {
    components?: string;
  };
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLI_ROOT = path.resolve(__dirname, "..");
const BUNDLED_PACKAGES_ROOT = path.join(CLI_ROOT, "packages");

const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".cts",
  ".mts",
  ".js",
  ".jsx",
  ".css",
  ".scss",
  ".sass",
  ".mdx",
  ".md"
]);

const EXCLUDED_DIRS = new Set([
  "node_modules",
  "dist",
  ".turbo",
  ".next",
  "build",
  ".cache"
]);

type TargetResolution = {
  base: string;
  includePackageName: boolean;
};

function getPackageSlug(packageName: string): string {
  if (!packageName) return packageName;
  const parts = packageName.split("/");
  return parts[parts.length - 1] || packageName;
}

function normalizePackageDirectory(packageName: string): string {
  const slug = getPackageSlug(packageName);
  if (slug === "ui") return "love-ui";
  return slug;
}

function resolveTargetConfig(packageJson: Record<string, any>): TargetResolution {
  const loveui = packageJson.loveui ?? {};
  const target = typeof loveui.target === "string" ? loveui.target.trim() : "";
  const category = loveui.category as string | undefined;

  if (target) {
    const include = typeof loveui.includePackageName === "boolean" ? loveui.includePackageName : false;
    return {
      base: target.replace(/\/+$/, ""),
      includePackageName: include,
    };
  }

  if (category === "feature") {
    return { base: "components", includePackageName: true };
  }

  if (category === "block") {
    return { base: "components/blocks", includePackageName: true };
  }

  return { base: "components/ui", includePackageName: true };
}

function adjustPathForConfig(
  relative: string,
  targetConfig: TargetResolution,
  packageSlug: string
): { cleanedPath: string; target: string } {
  let cleanedPath = relative.startsWith("src/") ? relative.slice(4) : relative;

  if (!targetConfig.includePackageName) {
    const baseSegments = targetConfig.base.split("/").filter(Boolean);
    const lastSegment = baseSegments[baseSegments.length - 1];
    if (lastSegment && cleanedPath.startsWith(`${lastSegment}/`)) {
      cleanedPath = cleanedPath.slice(lastSegment.length + 1);
    }
  }

  const prefix = targetConfig.includePackageName
    ? `${targetConfig.base}/${packageSlug}`
    : targetConfig.base;

  const normalizedPrefix = prefix.replace(/\/+/g, "/");
  const target = `${normalizedPrefix}/${cleanedPath}`.replace(/\/+/g, "/");

  return { cleanedPath, target };
}

async function loadComponentsConfig(root: string): Promise<string | null> {
  const configPath = path.join(root, "components.json");
  try {
    const raw = await readFile(configPath, "utf8");
    const parsed = JSON.parse(raw) as ComponentsConfig;
    const alias = parsed.aliases?.components;
    if (!alias) return null;
    return alias.replace(/^\.\//, "").replace(/\/+$/, "");
  } catch {
    return null;
  }
}

async function detectDefaultComponentsDir(root: string): Promise<string> {
  const tsConfigPath = ["tsconfig.json", "jsconfig.json"]
    .map((file) => path.join(root, file))
    .find((file) => existsSync(file));

  if (tsConfigPath) {
    try {
      const raw = await readFile(tsConfigPath, "utf8");
      const parsed = JSON.parse(raw);
      const paths = parsed.compilerOptions?.paths;
      if (paths && typeof paths === "object") {
        for (const key of Object.keys(paths)) {
          const values = paths[key];
          if (
            key === "@/*" &&
            Array.isArray(values) &&
            values.some((v: string) => v.startsWith("src/") || v.startsWith("./src/"))
          ) {
            return "src/components";
          }
        }
      }
    } catch {
      /* ignore parsing errors */
    }
  }

  if (existsSync(path.join(root, "src"))) {
    return "src/components";
  }

  return "components";
}

function adjustTargetPath(target: string, componentsDir: string, useExactTarget: boolean): string {
  const collapse = (value: string) => {
    const lead = value.startsWith("/");
    const trail = value.endsWith("/");
    const parts = value.split("/").filter(Boolean);
    const collapsed: string[] = [];
    for (const part of parts) {
      if (collapsed[collapsed.length - 1] === part) continue;
      collapsed.push(part);
    }
    const body = collapsed.join("/");
    return `${lead ? "/" : ""}${body}${trail ? "/" : ""}`;
  };

  if (useExactTarget) return collapse(target);

  const normalizedDir = componentsDir.replace(/\/+$/, "");
  if (target.startsWith("components/")) {
    const remainder = target.slice("components".length);
    return collapse(`${normalizedDir}${remainder}`.replace(/^\//, ""));
  }
  return collapse(target);
}

async function ensureDirectory(filePath: string, root: string) {
  const dir = path.dirname(path.join(root, filePath));
  await mkdir(dir, { recursive: true });
}

async function collectBundledFiles(packageDir: string, packageName: string): Promise<RegistryFile[]> {
  const pkgJsonPath = path.join(packageDir, "package.json");
  let packageJson: Record<string, any> = {};
  try {
    const raw = await readFile(pkgJsonPath, "utf8");
    packageJson = JSON.parse(raw) as Record<string, any>;
  } catch {
    /* ignore */
  }

  const targetConfig = resolveTargetConfig(packageJson);
  const packageSlug = getPackageSlug(packageName);

  const files: RegistryFile[] = [];

  async function walk(current: string, base: string) {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      if (EXCLUDED_DIRS.has(entry.name)) continue;

      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath, base);
        continue;
      }

      const ext = path.extname(entry.name);
      if (!TEXT_EXTENSIONS.has(ext)) continue;
      if (entry.name === "package.json") continue;

      const absolutePosix = path
        .relative(base, fullPath)
        .split(path.sep)
        .join("/");

      const { target } = adjustPathForConfig(absolutePosix, targetConfig, packageSlug);
      const content = await readFile(fullPath, "utf8");

      files.push({
        path: absolutePosix,
        target,
        content,
      });
    }
  }

  await walk(packageDir, packageDir);
  return files;
}

async function getBundledRegistryFiles(packageName: string): Promise<RegistryFile[] | null> {
  const directory = normalizePackageDirectory(packageName);
  const sourceDir = path.join(BUNDLED_PACKAGES_ROOT, directory);
  if (!existsSync(sourceDir)) return null;

  try {
    return await collectBundledFiles(sourceDir, packageName);
  } catch (error) {
    console.warn(`Warning: unable to read bundled sources for ${packageName}`, error);
    return null;
  }
}

export async function run(argv: string[] = process.argv.slice(2)) {
  if (argv.length < 2 || argv[0] !== "add") {
    console.log("Usage: npx love-ui add [...packages]");
    process.exit(1);
  }

  const packageNames = argv.slice(1);
  const projectRoot = process.cwd();
  const configDir = await loadComponentsConfig(projectRoot);
  const fallbackDir = await detectDefaultComponentsDir(projectRoot);
  const componentsDir = configDir ?? fallbackDir;
  const hasCustomConfig = configDir !== null;

  for (const packageName of packageNames) {
    if (!packageName.trim()) {
      continue;
    }

    console.log(`Adding ${packageName} component...`);

    const url =
      packageName === "ai"
        ? new URL("all.json", "https://registry.ai-sdk.dev/")
        : new URL(`r/${packageName}.json`, "https://www.loveui.dev/");

    let payload: RegistryPayload | null = null;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch registry definition: ${response.status} ${response.statusText}`);
      }
      payload = (await response.json()) as RegistryPayload;
    } catch (error) {
      console.warn(`Warning: unable to fetch registry definition before install. Falling back to CLI only.`, error);
    }

    const bundledFiles = await getBundledRegistryFiles(packageName);

    if (!hasCustomConfig) {
      await mkdir(path.join(projectRoot, componentsDir), { recursive: true });
    }

    const command = `npx -y shadcn@latest add ${url.toString()}`;
    const result = spawnSync(command, {
      stdio: "inherit",
      shell: true,
    });

    let shadcnSuccess = true;
    if (result.error) {
      console.warn(`Failed to run shadcn add for ${packageName}:`, result.error.message);
      shadcnSuccess = false;
    } else if (result.status !== 0) {
      console.warn(`shadcn add exited with code ${result.status} for ${packageName}`);
      shadcnSuccess = false;
    }

    const definitions: RegistryFile[] = payload?.files?.length
      ? payload.files
      : bundledFiles ?? [];

    if (!definitions.length) {
      console.warn(`No component templates found for ${packageName}.`);
      continue;
    }

    for (const file of definitions) {
      if (!file.content) continue;
      const desiredPath = adjustTargetPath(file.target, componentsDir, hasCustomConfig);
      const absolutePath = path.join(projectRoot, desiredPath);

      if (existsSync(absolutePath)) {
        continue;
      }

      await ensureDirectory(desiredPath, projectRoot);
      await writeFile(absolutePath, file.content, "utf8");
      console.log(`Created ${desiredPath}`);
    }

    if (!shadcnSuccess) {
      console.warn(
        `shadcn add did not complete successfully. Files were copied, but you may need to install dependencies manually.`
      );
    }
  }
}

const invokedDirectly = (() => {
  const entry = process.argv[1];
  if (!entry) return false;

  try {
    return pathToFileURL(entry).href === import.meta.url;
  } catch {
    return false;
  }
})();

if (invokedDirectly) {
  run().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
