import React from 'react';
import CategoryDropdown from '../CategoryDropdown';
import { CATEGORIES } from '../CategoryDropdown/CategoryDropdown';
import { CategoryType } from '@/common/types';

interface SearchBarProps {
  query: string;
  category: CategoryType | null;
  setQuery: (val: string) => void;
  setCategory: (val: CategoryType | null) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  category,
  setQuery,
  setCategory,
  handleSearch,
}) => {
  return (
    <div className="w-full">
      <form
        onSubmit={handleSearch}
        className="flex items-start gap-2 mb-2 w-full"
      >
        <div className="relative flex-1 flex flex-col gap-2">
          <div
            className="absolute  right-2 top-[0.55rem] flex items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <CategoryDropdown selected={category} onSelect={setCategory} />
          </div>
          <input
            type="text"
            className="flex-1 p-3  rounded-md shadow-e2 text-black w-full 
            focus:outline-none focus:ring-1 focus:ring-n3 border border-n2
            "
            placeholder="Escribí un tema para investigar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {category && (
            <div className="flex items-center gap-2 ">
              <button
                onClick={() => setCategory(null)}
                type="button"
                className="ml-1"
              >
                <span className="inline-flex items-center gap-1 bg-p1 text-n0   shadow-e2  text-n7 px-3 py-2 rounded-sm text-sm">
                  {category}
                  {CATEGORIES.find((cat) => cat.key === category)?.icon || null}
                </span>
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
