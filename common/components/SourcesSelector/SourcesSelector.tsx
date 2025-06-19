import React, { useState } from 'react';
import InputImage from '../InputImage';
import Input from '../Input';
import { set } from 'zod';

interface SourcesSelectedProps {
  getContent: (url: string) => Promise<void>;
  handleGenerateFromImage: (image: File) => void;
  isLoading: boolean;
}

const SourcesSelector = ({
  handleGenerateFromImage,
  getContent,
  isLoading,
}: SourcesSelectedProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [url, setUrl] = useState<string>('');

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (isDisabled) return;
    setIsDisabled(true);
    e.preventDefault();
    if (isValidUrl(url)) {
      await getContent(url);
    } else {
      alert('URL no válida');
    }
    setIsDisabled(false);
  };

  return (
    <div className="w-full flex flex-col h-full px-4">
      <h2 className="text-xl font-semibold mb-6">Selector de fuentes</h2>

      <InputImage
        handleImageUpload={handleGenerateFromImage}
        isLoading={isLoading}
      />

      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-4">
        <Input
          label="Url"
          name="url"
          value={url}
          handleChange={(_, value) => setUrl(value)}
          placeholder="https://..."
        />
      </form>
    </div>
  );
};

export default SourcesSelector;
