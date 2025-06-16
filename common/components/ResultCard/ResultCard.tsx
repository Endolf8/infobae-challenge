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
      className="!h-full w-full text-n10  relative overflow-hidden animate__animated animate__fadeIn animate__slow"
    >
      <a
        className="flex absolute top-0 gap-2 bg-n0 right-0 w-fit shadow-e1 border  items-center px-1 animate__animated  animate__slideInRight  animate__fast cursor-pointer"
        href={result.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="items-center  gap-4 justify-center flex w-8 h-8  ">
          <Img
            src={result.favicon || ''}
            alt="Favicon"
            width={24}
            height={24}
            Fallback={<Globe className=" w-6 h-6 text-n7 font-normal" />}
            className="inline-block align-middle object-fill "
          />
        </span>
      </a>
      <div>
        <a
          className="flex gap-4 w-full items-center mt-2 mr-1"
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="text-lg font-semibold  line-clamp-2 hover:text-p1 cursor-pointer ">
            {result.title}
          </h2>
        </a>

        <p className="text-sm text-gray-600 mb-2">
          {result.publishedDate
            ? new Date(result.publishedDate).toLocaleDateString()
            : 'Fecha no disponible'}{' '}
          -{result.author ? ` Autor: ${result.author}` : ' Autor no disponible'}
        </p>
        <p className="text-base mb-2">{result.summary}</p>
      </div>
    </Card>
  );
};

export default ResultCard;
