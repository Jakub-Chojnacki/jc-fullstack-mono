import { Image as ImageIcon, Upload, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import type { TImageUploadProps } from "./types";

const ImageUpload: React.FC<TImageUploadProps> = ({
  value,
  onChange,
  disabled = false,
  className = "",
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const currentObjectUrl = useRef<string | null>(null);

  const preview = useMemo(() => {
    // Clean up previous object URL
    if (currentObjectUrl.current) {
      URL.revokeObjectURL(currentObjectUrl.current);
      currentObjectUrl.current = null;
    }

    if (value) {
      const objectUrl = URL.createObjectURL(value);
      currentObjectUrl.current = objectUrl;
      return objectUrl;
    }

    return null;
  }, [value]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentObjectUrl.current) {
        URL.revokeObjectURL(currentObjectUrl.current);
        currentObjectUrl.current = null;
      }
    };
  }, []);

  const handleFileChange = (file: File | undefined): void => onChange(file);

  const handleDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled)
      return;

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type === "image/jpeg");

    if (imageFile) {
      handleFileChange(imageFile);
    }
  };

  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    handleFileChange(file);
  };

  const handleRemove = (): void => handleFileChange(undefined);

  return (
    <div className={cn("w-full", className)}>
      {preview
        ? (
            <div className="relative">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                <img
                  src={preview}
                  alt="Recipe preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={disabled}
                  className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm hover:bg-destructive/90 disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {value?.name}
                {" "}
                (
                {((value?.size || 0) / 1024 / 1024).toFixed(2)}
                {" "}
                MB)
              </p>
            </div>
          )
        : (
            <div
              className={cn(
                "relative aspect-video w-full rounded-lg border-2 border-dashed transition-colors",
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50",
                disabled && "opacity-50 cursor-not-allowed",
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type="file"
                accept="image/jpeg"
                onChange={handleInputChange}
                disabled={disabled}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
                <div className="rounded-full bg-muted p-3">
                  {isDragOver
                    ? (
                        <Upload className="h-6 w-6 text-primary" />
                      )
                    : (
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {isDragOver ? "Drop your image here" : "Upload recipe image"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Drag and drop or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPEG only, max 5MB
                  </p>
                </div>
              </div>
            </div>
          )}
    </div>
  );
};

export default ImageUpload;
