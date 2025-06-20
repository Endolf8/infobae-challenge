import React, { useState } from 'react';
import InputImage from '../InputImage';
import Input from '../Input';
import { toast } from 'sonner';
import ArticleServices from '@/common/services/ArticleServices';

interface SourcesSelectedProps {
  setGeneratedContent: (content: string | ((prev: string) => string)) => void;
  getContent: (url: string) => Promise<void>;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
}

const SourcesSelector = ({
  getContent,
  setGeneratedContent,
  setIsLoading,
  isLoading,
}: SourcesSelectedProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [url, setUrl] = useState<string>('');

  const handleGenerateFromImage = async (image: File) => {
    setGeneratedContent('');
    setIsLoading(true);

    const { ok, data } = await ArticleServices.requestStreamFromImage(image);
    setIsLoading(false);

    if (!ok || !data) {
      toast.error('Ocurrío un error inténtalo de nuevo más tarde.');
      setIsLoading(false);
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      setGeneratedContent((prev: string) => prev + chunk);
    }
  };

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
      toast.error('Por favor, proporciona una URL válida.');
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
          label="URL"
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
