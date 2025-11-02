"use client"

import { CircleUserRoundIcon } from "lucide-react"

import { useFileUpload } from "@/registry/default/hooks/use-file-upload"
import { Button } from "@/registry/default/ui/button"

export default function Component() {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    })

  const previewUrl = files[0]?.preview || null
  const fileName = files[0]?.file.name || null

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="inline-flex items-center gap-2 align-top">
        <div
          className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-input"
          aria-label={
            previewUrl ? "Preview of uploaded image" : "Default user avatar"
          }
        >
          {previewUrl ? (
            <img
              className="size-full object-cover"
              src={previewUrl}
              alt="Preview of uploaded image"
              width={32}
              height={32}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="opacity-60" size={16} />
            </div>
          )}
        </div>
        <div className="relative inline-block">
          <Button onClick={openFileDialog} aria-haspopup="dialog">
            {fileName ? "Change image" : "Upload image"}
          </Button>
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
            tabIndex={-1}
          />
        </div>
      </div>
      {fileName && (
        <div className="inline-flex gap-2 text-xs">
          <p className="truncate text-muted-foreground" aria-live="polite">
            {fileName}
          </p>{" "}
          <button
            onClick={() => removeFile(files[0]?.id)}
            className="font-medium text-destructive hover:underline"
            aria-label={`Remove ${fileName}`}
          >
            Remove
          </button>
        </div>
      )}
      <p
        aria-live="polite"
        role="region"
        className="mt-2 text-xs text-muted-foreground"
      >
        Basic image uploader ∙{" "}
        <a
          href="https://github.com/cosscom/coss/blob/main/apps/origin/docs/use-file-upload.md"
          className="underline hover:text-foreground"
        >
          Docs
        </a>
      </p>
    </div>
  )
}
