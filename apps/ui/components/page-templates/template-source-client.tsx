"use client"

import { useState } from "react"
import { getIconForLanguageExtension } from "@loveui/ui/components/icons"
import CodeBlock from "@/components/building-blocks/code-block"
import CopyButton from "@/components/building-blocks/copy-button"
import { FileTree } from "./file-tree"
import type { TemplateFile } from "@/lib/page-templates/utils"
import type { BundledLanguage } from "shiki/bundle/web"

interface TemplateSourceClientProps {
  files: TemplateFile[]
}

export function TemplateSourceClient({ files }: TemplateSourceClientProps) {
  const [selectedFile, setSelectedFile] = useState(files[0]?.path || "")

  const currentFile = files.find((f) => f.path === selectedFile)

  const getLanguage = (path: string): BundledLanguage => {
    const ext = path.split(".").pop()
    switch (ext) {
      case "tsx":
      case "ts":
        return "tsx"
      case "jsx":
      case "js":
        return "jsx"
      case "css":
        return "css"
      case "json":
        return "json"
      default:
        return "tsx"
    }
  }

  return (
    <div className="flex h-full w-full">
      {/* File tree sidebar */}
      <div className="flex h-full w-[200px] shrink-0 flex-col border-r border-border bg-muted/20">
        <div className="shrink-0 px-3 py-2 text-xs font-semibold text-muted-foreground">
          Files
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <FileTree
            files={files.map((f) => f.path)}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />
        </div>
      </div>

      {/* Code display */}
      <div className="relative flex h-full min-h-0 flex-1 flex-col bg-code">
        {currentFile?.content ? (
          <>
            <figure data-rehype-pretty-code-figure="" className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
              <figcaption
                data-rehype-pretty-code-title=""
                className="relative flex shrink-0 items-center gap-2 border-b border-border bg-muted/50 px-4 py-2 text-sm text-code-foreground [&_svg]:size-5 [&_svg]:text-code-foreground sm:[&_svg]:size-4"
                data-language={getLanguage(currentFile.path)}
              >
                {getIconForLanguageExtension(getLanguage(currentFile.path))}
                <span className="truncate">{currentFile.path}</span>
                <div className="ml-auto flex items-center">
                  <CopyButton
                    componentSource={currentFile.content}
                    className="static"
                  />
                </div>
              </figcaption>
              <div className="min-h-0 min-w-0 flex-1 overflow-auto">
                <CodeBlock
                  code={currentFile.content}
                  lang={getLanguage(currentFile.path)}
                  showLineNumbers={true}
                  fullHeight={true}
                  className="h-full w-full min-w-0"
                />
              </div>
            </figure>
          </>
        ) : (
          <div className="flex h-full items-center justify-center p-10">
            <p className="text-sm text-muted-foreground">
              Select a file to view its contents
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
