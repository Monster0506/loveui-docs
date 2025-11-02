"use client"

import React from "react"

import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/registry/default/ui/cropper"

type Area = { x: number; y: number; width: number; height: number }

export default function Component() {
  const [cropData, setCropData] = React.useState<Area | null>(null)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-col gap-4">
        <Cropper
          className="h-80"
          cropPadding={20}
          image="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/cropper-09_qskkln.jpg"
          onCropChange={setCropData}
        >
          <CropperDescription />
          <CropperImage />
          <CropperCropArea />
        </Cropper>

        {cropData && (
          <pre className="overflow-auto rounded-md border bg-muted px-4 py-3 font-mono text-xs text-foreground/80">
            <code>{JSON.stringify(cropData, null, 2)}</code>
          </pre>
        )}
      </div>

      <p
        aria-live="polite"
        role="region"
        className="mt-2 text-xs text-muted-foreground"
      >
        Cropper with crop data output ∙{" "}
        <a
          href="https://github.com/origin-space/image-cropper"
          className="underline hover:text-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          API
        </a>
      </p>
    </div>
  )
}
