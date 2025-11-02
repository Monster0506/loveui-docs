import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/registry/building-blocks/default/ui/cropper"

export default function Component() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Cropper
        className="aspect-square size-80"
        cropPadding={0}
        image="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/cropper-05_evczb3.jpg"
      >
        <CropperDescription />
        <CropperImage />
        <CropperCropArea className="border-4 border-blue-500" />
      </Cropper>

      <p
        aria-live="polite"
        role="region"
        className="mt-2 text-xs text-muted-foreground"
      >
        Cropper with full size crop area ∙{" "}
        <a
          href="https://github.com/origin-space/image-cropper"
          className="underline hover:text-foreground"
          target="_blank"
        >
          API
        </a>
      </p>
    </div>
  )
}
