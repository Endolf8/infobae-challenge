import { ExaSearchResult } from '../types';

interface Result<T> {
  ok: boolean;
  data: T | null;
}

interface ISearchServices {
  search: (query: string) => Promise<Result<ExaSearchResult[]>>;
}

const SearchServices: ISearchServices = {
  search: async (query: string) => {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        includeDomain: null,
        category: null,
      }),
    });

    const data = await res.json();
    return {
      ok: res.ok,
      data: data.results || null,
    };
  },
};

export default SearchServices;
