#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Server } from "@modelcontextprotocol/sdk/server";
import packageJson from "../package.json" assert { type: "json" };
import { listRegistryPackages, loadRegistryItem } from "./registry";

const LOVEUI_REGISTRY_SCHEME = "loveui://registry/";

const createResourceUri = (packageName: string) => `${LOVEUI_REGISTRY_SCHEME}${packageName}`;

async function main() {
  const server: any = new Server({
    name: "loveui-mcp",
    version: packageJson.version ?? "0.0.0"
  } as any);

  server.addResourceProvider({
    name: "loveui-registry",
    listResources: async () => {
      const packages = await listRegistryPackages();
      return packages.map((pkg) => ({
        uri: createResourceUri(pkg),
        name: pkg,
        description: `loveui registry definition for ${pkg}`,
        mimeType: "application/json"
      }));
    },
    readResource: async (uri: string) => {
      if (!uri.startsWith(LOVEUI_REGISTRY_SCHEME)) {
        throw new Error(`Unsupported resource URI: ${uri}`);
      }

      const packageName = uri.slice(LOVEUI_REGISTRY_SCHEME.length);
      const registryItem = await loadRegistryItem(packageName);

      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(registryItem, null, 2)
          }
        ]
      };
    }
  } as any);

  server.addTool({
    name: "get-loveui-package",
    description: "Fetch a loveui registry definition by package name.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        name: {
          type: "string",
          description: "Package name, e.g. badge"
        }
      },
      required: ["name"]
    },
    handler: async (args: Record<string, string>) => {
      const name = args?.name;
      if (typeof name !== "string" || name.trim() === "") {
        throw new Error("Package name is required.");
      }

      const registryItem = await loadRegistryItem(name);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(registryItem, null, 2)
          }
        ]
      };
    }
  } as any);

  await server.start();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
