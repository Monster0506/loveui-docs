"use client";

import {
  ImageCrop,
  ImageCropApply,
  ImageCropContent,
  ImageCropReset,
} from "../../../../../packages/image-crop";
import { Button } from "../../../../../packages/ui/src/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

const STOCK_IMAGES = [
  {
    label: "Coffee shop",
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
  },
  {
    label: "Workspace",
    url: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&w=1400&q=80",
  },
  {
    label: "Outdoor cafe",
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
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
          className="rounded-lg border"
          height={200}
          src={croppedImage}
          unoptimized
          width={200}
        />
        <Button onClick={handleReset} size="sm" type="button" variant="outline">
          Start Over
        </Button>
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
          Choose a preset photo above to explore custom actions.
        </p>
      )}

      {selectedFile && !croppedImage && !isLoading && (
        <ImageCrop
          key={selectedFile?.name ?? "stock-custom"}
          aspect={1}
          file={selectedFile}
          maxImageSize={1024 * 1024} // 1MB
          onChange={console.log}
          onComplete={console.log}
          onCrop={setCroppedImage}
        >
          <ImageCropContent className="max-w-md" />
          <div className="flex items-center gap-2">
            <ImageCropApply asChild>
              <Button size="sm" variant="outline">
                Apply Crop
              </Button>
            </ImageCropApply>
            <ImageCropReset asChild>
              <Button size="sm" variant="outline">
                Reset
              </Button>
            </ImageCropReset>
            <Button
              onClick={handleReload}
              size="sm"
              type="button"
              variant="outline"
            >
              Load another photo
            </Button>
          </div>
        </ImageCrop>
      )}
    </div>
  );
};

export default Example;
