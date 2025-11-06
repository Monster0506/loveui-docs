"use client"

import { useState } from "react"
import { ChevronRight, File, Folder } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileTreeNode {
  name: string
  path: string
  type: "file" | "folder"
  children?: FileTreeNode[]
}

interface FileTreeProps {
  files: string[]
  selectedFile: string
  onFileSelect: (path: string) => void
}

function buildTree(paths: string[]): FileTreeNode[] {
  const root: { [key: string]: FileTreeNode } = {}

  paths.forEach((path) => {
    const parts = path.split("/")
    let current = root

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1
      const fullPath = parts.slice(0, index + 1).join("/")

      if (!current[part]) {
        current[part] = {
          name: part,
          path: fullPath,
          type: isFile ? "file" : "folder",
          children: isFile ? undefined : {},
        }
      }

      if (!isFile && current[part].children) {
        current = current[part].children as { [key: string]: FileTreeNode }
      }
    })
  })

  const convertToArray = (obj: { [key: string]: FileTreeNode }): FileTreeNode[] => {
    return Object.values(obj).map((node) => ({
      ...node,
      children: node.children ? convertToArray(node.children as any) : undefined,
    }))
  }

  return convertToArray(root)
}

function TreeNode({
  node,
  selectedFile,
  onFileSelect,
  level = 0,
}: {
  node: FileTreeNode
  selectedFile: string
  onFileSelect: (path: string) => void
  level?: number
}) {
  const [isOpen, setIsOpen] = useState(true)

  if (node.type === "file") {
    return (
      <button
        onClick={() => onFileSelect(node.path)}
        className={cn(
          "flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm hover:bg-accent",
          selectedFile === node.path && "bg-accent font-medium"
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        <File className="h-4 w-4 shrink-0 text-blue-500" />
        <span className="truncate">{node.name}</span>
      </button>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm hover:bg-accent"
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        <ChevronRight
          className={cn(
            "h-4 w-4 shrink-0 transition-transform",
            isOpen && "rotate-90"
          )}
        />
        <Folder className="h-4 w-4 shrink-0 text-amber-500" />
        <span className="truncate">{node.name}</span>
      </button>
      {isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              selectedFile={selectedFile}
              onFileSelect={onFileSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function FileTree({ files, selectedFile, onFileSelect }: FileTreeProps) {
  const tree = buildTree(files)

  return (
    <div className="w-full space-y-0.5 py-2">
      {tree.map((node) => (
        <TreeNode
          key={node.path}
          node={node}
          selectedFile={selectedFile}
          onFileSelect={onFileSelect}
        />
      ))}
    </div>
  )
}
