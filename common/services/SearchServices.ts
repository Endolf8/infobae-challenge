import { ExaSearchResult } from '../types';

interface Result<T> {
  ok: boolean;
  data: {
    expand: T | null;
    noExpand: T | null;
  } | null;
}

interface ISearchServices {
  search: (
    query: string,
    category: string | null
  ) => Promise<Result<ExaSearchResult[]>>;
}

const SearchServices: ISearchServices = {
  search: async (query: string, category) => {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        category: category,
      }),
    });

    const data = await res.json();
    return {
      ok: res.ok,
      data: data || null,
    };
  },
};

export default SearchServices;
