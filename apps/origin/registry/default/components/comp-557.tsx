import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/registry/default/ui/cropper"

export default function Component() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Cropper
        className="h-80"
        image="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/cropper-03_uym8r0.jpg"
      >
        <CropperDescription />
        <CropperImage />
        <CropperCropArea className="border-blue-500" />
      </Cropper>

      <p
        aria-live="polite"
        role="region"
        className="mt-2 text-xs text-muted-foreground"
      >
        Cropper with custom crop area color ∙{" "}
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
