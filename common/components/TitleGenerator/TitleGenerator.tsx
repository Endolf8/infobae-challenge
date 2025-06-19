'use client';
import React, { useState } from 'react';
import Button from '../Button';
import Img from '../Img';
import starWhiteIcon from '@/public/assets/icon-star-white.svg';
import cn from '@/common/utils/classNames';
import { SunDim } from 'lucide-react';

interface TitleGeneratorProps {
  contentText: string;
  title: string;
  generatedTitles: string[];
  handleSaveCustomTitle: (title: string) => void;
  setGeneratedTitles: (titles: string[]) => void;
}

const TitleGenerator = ({
  contentText,
  title,
  generatedTitles,
  setGeneratedTitles,
  handleSaveCustomTitle,
}: TitleGeneratorProps) => {
  const [titleCount, setTitleCount] = useState<number | null>(3);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateTitles = async () => {
    if (!contentText || (titleCount && titleCount < 1) || !titleCount) {
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
    setGeneratedTitles(data.titles);
    setIsGenerating(false);
  };

  const handleTitleChange = (title: string) => {
    setCustomTitle(title);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || !isNaN(Number(value))) {
      setTitleCount(value === '' ? null : Number(value));
    }
  };

  return (
    <div className="w-full flex flex-col h-full ">
      <div className="px-6">
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

      <div className="flex-1 overflow-y-auto p-4 ">
        {generatedTitles.length > 0 && !isGenerating && (
          <h3 className="font-medium text-n4 mb-2">Títulos Generados:</h3>
        )}
        <ul className="space-y-2">
          {generatedTitles.map((t, index) => (
            <li key={index}>
              <button
                onClick={() => setCustomTitle(title)}
                className="w-full flex text-left text-sm  gap-2 hover:text-p1 "
              >
                <SunDim className={'h-7 w-7'} />
                {title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-3 flex flex-col gap-4  bg-sharp-gradient ">
        <label
          htmlFor="prompt"
          className="block px-2 text-n10 font-medium text-sm"
        >
          Título:
        </label>
        <textarea
          value={customTitle}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder={title}
          rows={4}
          className="w-full rounded-md px-4 text-sm bg-n0 focus:outline-none focus:ring-1 resize-none focus:shadow-e4 focus:ring-n-p1 border border-p1"
        />
        <div className="flex w-full justify-end">
          <Button
            handleClick={() => handleSaveCustomTitle(customTitle)}
            label="Guardar"
            className="!w-fit !bg-white !text-p1 shadow-e2"
          />
        </div>
      </div>
    </div>
  );
};

export default TitleGenerator;
