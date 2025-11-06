"use client"

import { useConfig } from "@/hooks/building-blocks/use-config"
import CopyButton from "@/components/building-blocks/copy-button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/building-blocks/default/ui/tabs"

export default function CliCommands({ name }: { name: string }) {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "")
  const registryBase = appUrl
    ? `${appUrl}/building-blocks`
    : "https://loveui.dev/building-blocks"
  const [config, setConfig] = useConfig()
  const packageManager = config.packageManager || "pnpm"

  const commands = {
    pnpm: `pnpm dlx love-ui@latest add ${registryBase}/r/${name}.json`,
    npm: `npx love-ui@latest add ${registryBase}/r/${name}.json`,
    yarn: `yarn dlx love-ui@latest add ${registryBase}/r/${name}.json`,
    bun: `bunx love-ui@latest add ${registryBase}/r/${name}.json`,
  }

  return (
    <div className="relative">
      <Tabs
        value={packageManager}
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          })
        }}
        className="rounded-md bg-zinc-950 dark:bg-zinc-900"
      >
        <TabsList className="dark h-auto w-full justify-start rounded-none border-b bg-transparent px-4 py-0">
          <TabsTrigger
            className="relative rounded-none py-3 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
            value="pnpm"
          >
            pnpm
          </TabsTrigger>
          <TabsTrigger
            className="relative rounded-none py-3 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
            value="npm"
          >
            npm
          </TabsTrigger>
          <TabsTrigger
            className="relative rounded-none py-3 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
            value="yarn"
          >
            yarn
          </TabsTrigger>
          <TabsTrigger
            className="relative rounded-none py-3 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
            value="bun"
          >
            bun
          </TabsTrigger>
        </TabsList>
        {Object.entries(commands).map(([pkg, command]) => (
          <TabsContent className="m-0" key={pkg} value={pkg}>
            <pre className="overflow-auto p-4 font-mono text-[12.8px] text-zinc-100">
              {command}
            </pre>
          </TabsContent>
        ))}
      </Tabs>
      <CopyButton
        componentSource={commands[packageManager as keyof typeof commands]}
        className="top-1"
      />
    </div>
  )
}
