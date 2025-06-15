import React from 'react';
import Card from '../Card';
import { ExaSearchResult } from '@/common/types';
import Img from '../Img';
import { Globe } from 'lucide-react';

interface ResultCardProps {
  result: ExaSearchResult;
}
const ResultCard = ({ result }: ResultCardProps) => {
  return (
    <Card
      rounded="m"
      shadow="e3"
      padding="xl"
      className="!h-full w-full text-n10  relative overflow-hidden"
    >
      <a
        className="absolute top-0 right-0 items-center  cursor-pointer justify-center flex w-8 h-8   shadow-e3 !rounded-tr-md  animate__animated animate__slideInDown"
        href={result.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Img
          src={result.favicon || ''}
          alt="Favicon"
          width={24}
          height={24}
          Fallback={<Globe className=" w-6 h-6 text-n4 font-normal" />}
          className="inline-block align-middle object-fill !rounded-tr-sm "
        />
      </a>
      <div>
        <div className="flex gap-4 w-full items-center">
          <h2 className="text-lg font-semibold ">{result.title}</h2>
        </div>

        <p className="text-sm text-gray-600 mb-2">
          {result.publishedDate
            ? new Date(result.publishedDate).toLocaleDateString()
            : 'Fecha no disponible'}{' '}
          -{result.author ? ` Autor: ${result.author}` : ' Autor no disponible'}
        </p>
        <p className="text-base mb-2">
          {result.summary || 'No hay resumen disponible.'}
        </p>
      </div>
    </Card>
  );
};

export default ResultCard;
