import React, { useEffect } from 'react';
import { useState } from 'react';
import ResultList from '@/common/components/ResultList/ResultList';
import SearchBar from '@/common/components/SearchBar';
import Img from '@/common/components/Img';
import SearchServices from '@/common/services/SearchServices';
import { CategoryType, ExaSearchResult } from '@/common/types';
import infobaeLogo from '@/public/assets/Infobae-logo.svg';
import { NotebookPen } from 'lucide-react';

const HomeView = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [results, setResults] = useState<{
    expand: ExaSearchResult[] | null;
    noExpand: ExaSearchResult[] | null;
  }>({
    expand: [],
    noExpand: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notResultsFinder, setNotResultsFinder] = useState(false);

  const performSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    setNotResultsFinder(false);
    setResults({ expand: [], noExpand: [] });

    const { ok, data } = await SearchServices.search(query, category);

    if (!ok || (!data?.expand && !data?.noExpand)) {
      setIsLoading(false);
      return;
    }

    if (data) {
      setResults(data);
    } else {
      setNotResultsFinder(true);
    }

    setIsLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await performSearch();
  };

  useEffect(() => {
    performSearch();
  }, [category]);
  const firstSearch =
    results.expand?.length === 0 &&
    results.noExpand?.length === 0 &&
    !isLoading;

  return (
    <div className="flex  flex-col bg-stone-n7 items-center mx-auto pt-12 px-16 h-screen max-w-screen gap-4 bg-sharp-gradient !backdrop-blur-3xl">
      {!firstSearch && (
        <Img
          src={infobaeLogo}
          alt="Infobae Logo"
          className="h-4 mb-4 absolute top-4 left-[-2rem]  animate__slideInDown animate__animated "
        />
      )}
      <div className="flex flex-col h-full w-full gap-4  items-center overflow-y-auto">
        <div
          className={` flex flex-col items-center justify-center transition-all duration-500 ease-out ${
            !firstSearch ? 'opacity-0 h-0' : 'opacity-100 h-full'
          }`}
        >
          <Img src={infobaeLogo} alt="Infobae Logo" className="h-16 mb-4" />
          <p className="text-h4 text-n10 text-center mb-m">
            Descubrí lo que vale la pena investigar.
          </p>
        </div>
        <div
          className={`transition-all duration-500 ease-out transform ${
            firstSearch ? 'w-8/12 translate-y-0' : 'w-full'
          }`}
        >
          <SearchBar
            category={category}
            handleSearch={handleSearch}
            query={query}
            setQuery={setQuery}
            setCategory={setCategory}
          />
        </div>
        <div className="h-full w-full">
          <ResultList
            isLoading={isLoading}
            results={results}
            query={query}
            notResultsFinder={notResultsFinder}
          />
        </div>
      </div>

      <div className="fixed text-p1 bottom-4 right-4 cursor-pointer rounded-full flex items-center justify-center bg-n0 h-28 w-28 animate__animated animate__zoomIn shadow-e4">
        <NotebookPen className="h-16 w-16" />
      </div>
    </div>
  );
};

export default HomeView;
