import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';

interface InputImageProps {
  handleImageUpload: (file: File) => void;
  isLoading?: boolean;
}

export default function InputImage({
  handleImageUpload,
  isLoading = false,
}: InputImageProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // Create preview URL for the image
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);

    handleImageUpload(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="border-2 border-dashed border-gray-300 hover:border-p1 rounded-lg p-2 transition-colors cursor-pointer"
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          disabled={isLoading}
        />

        {previewUrl ? (
          <div className="relative aspect-video w-full">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-contain rounded-md"
            />
          </div>
        ) : (
          <div className="aspect-video w-full flex flex-col items-center justify-center">
            <p className="text-sm text-gray-500 text-center">
              Sube una imagen PNG o JPG
            </p>
          </div>
        )}
      </div>

      {fileName && (
        <div className="flex items-center justify-between bg-gray-100 rounded-md p-2 my-2">
          <span className="text-sm text-gray-700 truncate">{fileName}</span>
          <button
            type="button"
            onClick={triggerFileInput}
            disabled={isLoading}
            className="ml-4 text-sm font-medium text-p1 cursor-pointer disabled:text-gray-400"
          >
            Cambiar
          </button>
        </div>
      )}
    </div>
  );
}
