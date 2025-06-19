import React, { useState } from 'react';
import ResultCard from '../ResultCard';
import { ExaSearchResult } from '@/common/types';
import EmptyContent from '../EmptyContent';
import Loading from '../Loading';

interface ResultListProps {
  results: {
    expand: ExaSearchResult[] | null;
    noExpand: ExaSearchResult[] | null;
  };
  isLoading: boolean;
  query: string;
  notResultsFinder: boolean;
}

const ResultList = ({
  results,
  isLoading,
  query,
  notResultsFinder,
}: ResultListProps) => {
  const [showNoExpand, setShowNoExpand] = useState(false);

  const shouldShowNoResults =
    !isLoading &&
    results.expand?.length === 0 &&
    results.noExpand?.length === 0 &&
    query.trim() !== '' &&
    notResultsFinder;

  const handleToggle = () => {
    setShowNoExpand((prev) => !prev);
  };

  return (
    <div className="w-full pb-8 !z-20">
      <div className="grid grid-cols-3  !z-20 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[1fr]">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-8">
            <Loading title="Buscando resultados..." />
          </div>
        ) : shouldShowNoResults ? (
          <div className="col-span-full text-center h-full py-8 text-lg">
            <EmptyContent />
          </div>
        ) : (
          results.expand?.map((r, index) => (
            <div
              key={index}
              className="h-full  animate__animated animate__fadeIn flex"
            >
              <ResultCard result={r} />
            </div>
          ))
        )}
      </div>

      {results.noExpand && results.noExpand.length > 0 && (
        <div className="w-full my-4">
          <button onClick={handleToggle} className="text-sm text-n10">
            {showNoExpand
              ? 'Ocultar menos relevantes ▲'
              : 'Mostrar menos relevantes ▼'}
          </button>
        </div>
      )}

      {showNoExpand && (
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[1fr] mt-4">
          {results.noExpand?.map((r, index) => (
            <div
              key={index}
              className="h-full animate__animated animate__fadeIn flex"
            >
              <ResultCard result={r} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultList;
