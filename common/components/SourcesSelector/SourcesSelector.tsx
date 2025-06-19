import React from 'react';
import InputImage from '../InputImage';

interface SourcesSelectedProps {
  handleGenerateFromImage: (image: File) => void;
  isLoading: boolean;
}

const SourcesSelector = ({
  handleGenerateFromImage,
  isLoading,
}: SourcesSelectedProps) => {
  return (
    <div className="w-full flex flex-col h-full px-4 bg-sharp-gradient ">
      <h2 className="text-xl font-semibold mb-6">Selector de fuentes</h2>

      <InputImage
        handleImageUpload={handleGenerateFromImage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SourcesSelector;
