"use client";

import {
  ImageCrop,
  ImageCropApply,
  ImageCropContent,
  ImageCropReset,
} from "../../../../../packages/image-crop";
import { Button } from "../../../../../packages/ui/src/ui/button";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const STOCK_IMAGES = [
  {
    label: "Mountain sunrise",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "City skyline",
    url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "Foggy forest",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
  },
];

const getFileFromUrl = async (url: string, filename: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch image");
  }

  const blob = await response.blob();
  const extension = blob.type.split("/").at(-1) || "jpg";

  return new File([blob], `${filename}.${extension}`, {
    type: blob.type || "image/jpeg",
  });
};

const Example = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const activeImage = STOCK_IMAGES[activeIndex];

    const load = async () => {
      setIsLoading(true);
      setError(null);
      setSelectedFile(null);

      try {
        const file = await getFileFromUrl(
          activeImage.url,
          activeImage.label.toLowerCase().replace(/\s+/g, "-")
        );

        if (!cancelled) {
          setSelectedFile(file);
          setCroppedImage(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unable to load stock image."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [activeIndex, reloadKey]);

  const handleReload = () => {
    setReloadKey((key) => key + 1);
  };

  const handleReset = () => {
    setCroppedImage(null);
  };

  const handleRetry = () => {
    handleReload();
  };

  if (croppedImage) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {STOCK_IMAGES.map((image, index) => (
            <Button
              key={image.label}
              onClick={() => setActiveIndex(index)}
              size="sm"
              variant={index === activeIndex ? "default" : "outline"}
            >
              {image.label}
            </Button>
          ))}
        </div>
        <Image
          alt="Cropped"
          height={180}
          src={croppedImage}
          unoptimized
          width={180}
        />
        <div className="flex items-center gap-2">
          <Button
            onClick={handleReset}
            size="sm"
            type="button"
            variant="outline"
          >
            Crop again
          </Button>
          <Button
            onClick={() => setActiveIndex((index) => (index + 1) % STOCK_IMAGES.length)}
            size="sm"
            type="button"
            variant="outline"
          >
            Use another photo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {STOCK_IMAGES.map((image, index) => (
          <Button
            key={image.label}
            disabled={isLoading && index === activeIndex}
            onClick={() => setActiveIndex(index)}
            size="sm"
            variant={index === activeIndex ? "default" : "outline"}
          >
            {image.label}
          </Button>
        ))}
      </div>

      {isLoading && (
        <div className="h-52 w-full max-w-md animate-pulse rounded-lg bg-muted" />
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <span>{error}</span>
          <Button onClick={handleRetry} size="sm" variant="ghost">
            Retry
          </Button>
        </div>
      )}

      {!selectedFile && !isLoading && !error && (
        <p className="text-sm text-muted-foreground">
          Select an image above to start cropping.
        </p>
      )}

      {selectedFile && !croppedImage && !isLoading && (
        <ImageCrop
          key={selectedFile?.name ?? "stock-image"}
          aspect={1}
          file={selectedFile}
          maxImageSize={1024 * 1024} // 1MB
          onChange={console.log}
          onComplete={console.log}
          onCrop={setCroppedImage}
        >
          <ImageCropContent className="max-w-md" />
          <div className="flex items-center gap-2">
            <ImageCropApply />
            <ImageCropReset />
            <Button
              onClick={handleReload}
              size="icon"
              type="button"
              variant="ghost"
            >
              <XIcon className="size-4" />
            </Button>
          </div>
        </ImageCrop>
      )}
    </div>
  );
};

export default Example;
