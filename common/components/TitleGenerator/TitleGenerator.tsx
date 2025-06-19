'use client';

import React, { useState } from 'react';
import Button from '../Button';
import Img from '../Img';
import starWhiteIcon from '@/public/assets/icon-star-white.svg';
import cn from '@/common/utils/classNames';

interface TitleGeneratorProps {
  contentText: string;
  title: string;
  handleSaveCustomTitle: (title: string) => void;
}

const TitleGenerator = ({
  contentText,
  title,
  handleSaveCustomTitle,
}: TitleGeneratorProps) => {
  const [titleCount, setTitleCount] = useState<number | null>(null);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateTitles = async () => {
    if (!contentText || (titleCount && titleCount < 1)) {
      alert(
        'Por favor, proporciona el texto del contenido y una cantidad válida de títulos.'
      );
      return;
    }
    setIsGenerating(true);
    const response = await fetch('/api/generateTitles', {
      method: 'POST',
      body: JSON.stringify({ contentText, count: titleCount }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    setGeneratedTitles(data.titles); // Suponiendo que la API devuelve un array de títulos
    setIsGenerating(false);
  };

  // Previsualización del título
  const handleTitleChange = (title: string) => {
    setCustomTitle(title);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || !isNaN(Number(value))) {
      // Permitir borrar completamente o ingresar números
      setTitleCount(value === '' ? null : Number(value)); // Establecer el valor como número o null
    }
  };

  return (
    <div className="w-full px-6 flex flex-col h-full ">
      <div>
        <h2 className="text-xl font-semibold mb-6">Generación de Títulos</h2>
        <label
          htmlFor="titleCount"
          className="block text-sm font-medium text-gray-700"
        >
          Cantidad de títulos:
        </label>
        <div className="w-full flex items-center gap-4 justify-between">
          <input
            type="number"
            id="titleCount"
            value={titleCount ?? ''}
            min="0"
            onChange={handleInputChange}
            disabled={isGenerating}
            className="w-full border border-n2 rounded-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-p1"
          />
          <Button
            label="Generar Títulos"
            onClick={generateTitles}
            className="h-full  !p-2 rounded-sm"
          >
            <div className="flex items-center gap-2 text-white">
              <p>Generar</p>
              <Img
                src={starWhiteIcon}
                alt="generar"
                className={cn('h-5 w-5', isGenerating ? 'animate-spin' : '')}
              />
            </div>
          </Button>
        </div>
      </div>

      {/* Títulos Generados */}
      <div className="flex-1 overflow-y-auto py-4 ">
        {generatedTitles.length > 0 && !isGenerating && (
          <h3 className=" font-medium text-gray-800 mb-2">
            Títulos Generados:
          </h3>
        )}
        <ul className="space-y-2">
          {generatedTitles.map((title, index) => (
            <li key={index}>
              <button
                onClick={() => setCustomTitle(title)}
                className="w-full text-left text-sm font-semibold hover:text-p1"
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-sharp-gradient ">
        <div className="bg-n0 p-2 flex flex-col gap-4 border-t border-gray-200 !bg-sharp-gradient ">
          <h3 className="text-lg font-medium text-n10">Título:</h3>
          <textarea
            value={customTitle}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder={title}
            rows={4}
            className="w-full border border-gray-300 rounded-md px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex w-full justify-end">
            <Button
              handleClick={() => handleSaveCustomTitle(customTitle)}
              label="Guardar"
              className="!w-fit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleGenerator;
