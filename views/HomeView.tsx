import ResultCard from '@/common/components/ResultCard';
import SearchServices from '@/common/services/SearchServices';
import { ExaSearchResult } from '@/common/types';
import React from 'react';
import { useState } from 'react';

const HomeView = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ExaSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [notResultsFinder, setNotResultsFinder] = useState(false);
  ///TODO: Implement notResultsFinder state to show a message when no results are found

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    const { ok, data } = await SearchServices.search(query);

    if (!ok || !data) {
      setResults([]);
      setLoading(false);
      return;
    }
    if (data.length > 0) {
      setResults(data);
    } else {
      setResults([]);
      setNotResultsFinder(true);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col mx-auto py-12 px-4 max-w-screen">
      <h1 className="text-2xl font-semibold mb-4">🧠 Exa Research Tool</h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 border p-2 text-black rounded"
          placeholder="Escribí un tema para investigar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {/* ///TODO: move list to components */}
      <div className=" grid-cols-3 gap-4  grid flex-1">
        {results.map((r, index) => (
          <div
            key={index}
            className="col-span-1   h-full w-full animate__animated animate__fadeIn"
          >
            <ResultCard result={r} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
