import React, { useState, ChangeEvent } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Label } from "./ui/label";
import { cn, generateColorFromHash, getFallback } from "@/lib/utils";
import { AVATAR_BG, BACKEND_URL } from "@/lib/constants";
import { uploadImage } from "@/actions/upload-image";
import { deleteImage } from "@/actions/delete-image";

interface PictureUploaderProps {
  name: string;
  avatar: string | null;
}

export const PictureUploader: React.FC<PictureUploaderProps> = ({
  name,
  avatar,
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const src = avatar ? `${BACKEND_URL}/user/image/${avatar}` : null;

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      await uploadImage(formData);

      setError(null);
    } catch (err) {
      setError((err as Error).message || "An error occurred during upload");
    } finally {
      setUploading(false);
    }
  };

  const handleImageDelete = async () => {
    try {
      setUploading(true);
      setError(null);
      await deleteImage();
    } catch (err) {
      setError((err as Error).message || "An error occurred during deletion");
    } finally {
      setUploading(false);
    }
  };

  const fallback = name ? getFallback(name) : "";
  const color = name ? generateColorFromHash(name) : AVATAR_BG;

  return (
    <div className="flex flex-col items-center gap-4 p-2 w-64">
      <div
        className={`flex items-center justify-center w-40 h-40 rounded-lg bg-cover bg-center`}
        style={
          src
            ? {
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : { backgroundColor: color }
        }
      >
        {!src && (
          <span className="text-white text-6xl font-bold">{fallback}</span>
        )}
      </div>
      <div className="flex w-full justify-between">
        <Label
          htmlFor="upload"
          className={cn(buttonVariants(), "cursor-pointer")}
        >
          Upload
        </Label>
        <Button onClick={handleImageDelete}>Delete Image</Button>
      </div>
      <input
        id="upload"
        type="file"
        accept="image/*"
        disabled={uploading}
        className="hidden"
        onChange={handleImageUpload}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};
