import { constants } from "node:fs";
import { access, readFile, readdir } from "node:fs/promises";
import { join, extname, relative } from "node:path";
import postcss from "postcss";
import postcssNested from "postcss-nested";
import type { RegistryItem } from "shadcn/schema";

const IGNORED_DIRECTORIES = new Set([
  ".turbo",
  ".next",
  ".git",
  "dist",
  "build",
  "storybook-static",
  "node_modules",
  "__tests__",
  "__mocks__",
  "coverage",
]);

const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".css",
  ".scss",
  ".sass",
  ".mdx",
]);

type FileDescriptor = {
  absolute: string;
  relative: string;
};

const toPosix = (value: string) => value.replace(/\\/g, "/");

const EXCLUDED_FILES = new Set([
  "package.json",
  "tsconfig.json",
  "tsconfig.build.json",
  "tsconfig.test.json",
  "README.md",
  ".DS_Store",
]);

const collectFiles = async (
  directory: string,
  base: string,
  acc: FileDescriptor[]
) => {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      if (IGNORED_DIRECTORIES.has(entry.name)) {
        continue;
      }

      await collectFiles(fullPath, base, acc);
      continue;
    }

    const extension = extname(entry.name);
    if (
      !TEXT_EXTENSIONS.has(extension) ||
      EXCLUDED_FILES.has(entry.name) ||
      entry.name.endsWith(".d.ts") ||
      entry.name.endsWith(".test.ts") ||
      entry.name.endsWith(".test.tsx") ||
      entry.name.endsWith(".stories.tsx")
    ) {
      continue;
    }

    acc.push({
      absolute: fullPath,
      relative: toPosix(relative(base, fullPath)),
    });
  }
};

type TargetResolution = {
  base: string;
  includePackageName: boolean;
};

const resolveTargetBase = (
  packageJson: Record<string, any>,
  packageName: string
): TargetResolution => {
  const loveui = packageJson.loveui ?? {};
  const target = loveui.target as string | undefined;
  const kind = loveui.category as string | undefined;

  if (typeof target === "string" && target.trim().length > 0) {
    const include =
      typeof loveui.includePackageName === "boolean"
        ? loveui.includePackageName
        : false;
    return { base: target.replace(/\/+$/, ""), includePackageName: include };
  }

  if (kind === "feature") {
    return { base: "components", includePackageName: true };
  }

  if (kind === "block") {
    return { base: "components/blocks", includePackageName: true };
  }

  return { base: "components/ui", includePackageName: true };
};

const resolveRegistryType = (packageJson: Record<string, any>) => {
  const loveui = packageJson.loveui ?? {};
  return (loveui.type as RegistryItem["type"]) ?? "registry:ui";
};

const ensureExists = async (path: string) => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

export const getPackage = async (packageName: string) => {
  const packageDir = join(process.cwd(), "..", "..", "packages", packageName);
  const packagePath = join(packageDir, "package.json");

  if (!(await ensureExists(packagePath))) {
    throw new Error(`Missing package.json for ${packageName}`);
  }

  const packageJson = JSON.parse(await readFile(packagePath, "utf-8"));

  const dependencyEntries = Object.keys(packageJson.dependencies ?? {});
  const peerDependencyEntries = Object.keys(packageJson.peerDependencies ?? {});
  const devDependencyEntries = Object.keys(packageJson.devDependencies ?? {});

  const internalDependencies = new Set(
    [...dependencyEntries, ...peerDependencyEntries, ...devDependencyEntries]
      .filter((dep) => dep.startsWith("@loveui/") || dep.startsWith("@loveui/"))
      .filter((dep) => dep !== "@loveui/shadcn-ui")
  );

  const dependencies = [
    ...new Set(
      [...dependencyEntries, ...peerDependencyEntries].filter(
        (dep) => !internalDependencies.has(dep)
      )
    ),
  ];

  const devDependencies = [
    ...new Set(
      devDependencyEntries.filter(
        (dep) =>
          !internalDependencies.has(dep) &&
          ![
            "@loveui/typescript-config",
            "@types/react",
            "@types/react-dom",
            "typescript",
          ].includes(dep)
      )
    ),
  ];

  const registryDependencies: string[] = [];

  for (const dep of internalDependencies) {
    const normalized = dep.replace(/^@repo\//, "").replace(/^@loveui\//, "");
    registryDependencies.push(`https://www.loveui.dev/r/${normalized}.json`);
  }

  const registryType = resolveRegistryType(packageJson);

  const discoveredFiles: FileDescriptor[] = [];
  await collectFiles(packageDir, packageDir, discoveredFiles);

  const files: NonNullable<RegistryItem["files"]> = [];
  const css: RegistryItem["css"] = {};

  const targetConfig = resolveTargetBase(packageJson, packageName);

  for (const file of discoveredFiles) {
    const content = await readFile(file.absolute, "utf-8");
    const extension = extname(file.absolute);

    if (extension === ".css" || extension === ".scss" || extension === ".sass") {
      const processed = await postcss([postcssNested]).process(content, {
        from: undefined,
      });
      const ast = postcss.parse(processed.css);

      ast.walkAtRules("layer", (atRule) => {
        const layerKey = `@layer ${atRule.params}`;
        css[layerKey] ??= {};

        atRule.walkRules((rule) => {
          if (
            rule.parent &&
            rule.parent.type === "atrule" &&
            (rule.parent as any).name === "media"
          ) {
            return;
          }

          const selector = rule.selector;
          const declaration: Record<string, string> = {};

          rule.walkDecls((decl) => {
            declaration[decl.prop] = decl.value;
          });

          if (Object.keys(declaration).length > 0) {
            css[layerKey][selector] = declaration;
          }
        });

        atRule.walkAtRules("media", (mediaRule) => {
          const mediaKey = `@media ${mediaRule.params}`;
          css[layerKey][mediaKey] ??= {};

          mediaRule.walkRules((rule) => {
            const selector = rule.selector;
            const declaration: Record<string, string> = {};

            rule.walkDecls((decl) => {
              declaration[decl.prop] = decl.value;
            });

            if (Object.keys(declaration).length > 0) {
              css[layerKey][mediaKey][selector] = declaration;
            }
          });
        });
      });

      continue;
    }

    let cleanedPath = file.relative.startsWith("src/")
      ? file.relative.slice(4)
      : file.relative;

    if (!targetConfig.includePackageName) {
      const baseSegments = targetConfig.base.split("/").filter(Boolean);
      const lastSegment = baseSegments[baseSegments.length - 1];
      if (
        lastSegment &&
        cleanedPath.startsWith(`${lastSegment}/`)
      ) {
        cleanedPath = cleanedPath.slice(lastSegment.length + 1);
      }
    }

    const packageSlug = packageName.includes("/")
      ? packageName.split("/").pop() ?? packageName
      : packageName;

    const prefix = targetConfig.includePackageName
      ? `${targetConfig.base}/${packageSlug}`
      : targetConfig.base;

    const normalizedPrefix = prefix.replace(/\/+$/, "");

    files.push({
      type: registryType,
      path: cleanedPath,
      target: `${normalizedPrefix}/${cleanedPath}`.replace(/\/+/g, "/"),
      content,
    });
  }

  const cssOnly = !files.length && Object.keys(css).length > 0;
  const finalType: RegistryItem["type"] = cssOnly
    ? "registry:style"
    : registryType;

  const response: RegistryItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: packageName,
    type: finalType,
    title: packageJson.title ?? packageName,
    description: packageJson.description,
    author: packageJson.author ?? "Connor Love <hello@loveconnor.com>",
    dependencies: dependencies.length ? dependencies : undefined,
    devDependencies: devDependencies.length ? devDependencies : undefined,
    registryDependencies: registryDependencies.length
      ? Array.from(new Set(registryDependencies))
      : undefined,
    files: files.length ? files : undefined,
    css: Object.keys(css).length ? css : undefined,
  };

  return response;
};
