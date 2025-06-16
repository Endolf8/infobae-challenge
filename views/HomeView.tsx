import React, { useEffect } from 'react';
import { useState } from 'react';
import ResultList from '@/common/components/ResultList/ResultList';
import SearchServices from '@/common/services/SearchServices';
import { CategoryType, ExaSearchResult } from '@/common/types';
import SearchBar from '@/common/components/SearchBar';

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

  return (
    <div className="flex flex-col bg-stone-n7 mx-auto py-12 px-16 h-screen max-w-screen gap-4 ">
      <SearchBar
        category={category}
        handleSearch={handleSearch}
        query={query}
        setQuery={setQuery}
        setCategory={setCategory}
      />
      <div className="h-full w-full">
        <ResultList
          isLoading={isLoading}
          results={results}
          query={query}
          notResultsFinder={notResultsFinder}
        />
      </div>
    </div>
  );
};

export default HomeView;
