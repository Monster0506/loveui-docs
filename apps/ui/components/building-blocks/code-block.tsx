"use client"

import { JSX, useLayoutEffect, useState } from "react"
import { Fragment, jsx, jsxs } from "react/jsx-runtime"
import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import type { BundledLanguage } from "shiki/bundle/web"
import { codeToHast } from "shiki/bundle/web"
import { cn } from "@/lib/utils"

type HighlightOptions = {
  showLineNumbers?: boolean
}

export async function highlight(
  code: string,
  lang: BundledLanguage,
  options?: HighlightOptions
) {
  const { showLineNumbers = true } = options ?? {}

  const hast = await codeToHast(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: "light",
    transformers: [
      {
        pre(node) {
          node.properties = {
            ...(node.properties ?? {}),
            class:
              "no-scrollbar text-[.8125rem] min-w-0 overflow-auto px-4 py-3.5 outline-none has-data-[highlighted-line]:px-0 has-data-[line-numbers]:px-0 has-data-[slot=tabs]:p-0 !bg-transparent",
          }
        },
        code(node) {
          if (showLineNumbers) {
            node.properties = {
              ...(node.properties ?? {}),
              "data-line-numbers": "",
            }
          }
        },
        line(node) {
          node.properties = {
            ...(node.properties ?? {}),
            "data-line": "",
          }
        },
      },
    ],
  })

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element
}

type Props = {
  code: string | null
  lang: BundledLanguage
  initial?: JSX.Element
  preHighlighted?: JSX.Element | null
  className?: string
  fullHeight?: boolean
  showLineNumbers?: boolean
}

export default function CodeBlock({
  code,
  lang,
  initial,
  preHighlighted,
  className,
  fullHeight,
  showLineNumbers = true,
}: Props) {
  const [content, setContent] = useState<JSX.Element | null>(
    preHighlighted || initial || null
  )

  useLayoutEffect(() => {
    // If we have pre-highlighted content, use that
    if (preHighlighted) {
      setContent(preHighlighted)
      return
    }

    let isMounted = true

    if (code) {
      highlight(code, lang, { showLineNumbers }).then((result) => {
        if (isMounted) setContent(result)
      })
    } else {
      setContent(
        <pre className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-900">No code available</pre>
      )
    }

    return () => {
      isMounted = false
    }
  }, [code, lang, preHighlighted, showLineNumbers])

  return content ? (
    <div
      className={cn(
        "min-w-0",
        "[&_code]:font-mono [&_code]:text-[13px] [&_pre]:w-full [&_pre]:min-w-0 [&_pre]:max-w-full [&_pre]:overflow-auto [&_pre]:rounded-md [&_pre]:bg-zinc-100 [&_pre]:p-4 [&_pre]:leading-snug dark:[&_pre]:bg-zinc-900",
        fullHeight
          ? "h-full [&_pre]:h-full [&_pre]:max-h-none"
          : "[&_pre]:max-h-[450px]",
        className
      )}
    >
      {content}
    </div>
  ) : (
    <pre
      className={cn(
        "rounded-md bg-zinc-100 p-4 dark:bg-zinc-900",
        fullHeight && "h-full overflow-auto",
        className
      )}
    >
      Loading...
    </pre>
  )
}
