import { CategoryType } from '@/common/types';
import cn from '@/common/utils/classNames';
import {
  FileText,
  Newspaper,
  FlaskConical,
  Settings2,
  Check,
} from 'lucide-react';
import React, { useState, ReactElement } from 'react';

export const CATEGORIES: {
  key: CategoryType;
  label: string;
  icon: ReactElement;
}[] = [
  {
    key: 'research paper',
    label: 'Research Paper',
    icon: <FlaskConical size={16} />,
  },
  { key: 'news', label: 'News', icon: <Newspaper size={16} /> },
  { key: 'pdf', label: 'PDF', icon: <FileText size={16} /> },
];

interface Props {
  selected: CategoryType | null;
  onSelect: (val: CategoryType | null) => void;
}

const CategoryDropdown: React.FC<Props> = ({ selected, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-sm  text-sm ',
          selected ? 'bg-p1 text-n0' : 'bg-n2'
        )}
      >
        <Settings2 size={16} />
        Tipo
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-40 left-[-2rem] rounded-md bg-white shadow-lg ring-1 ring-black/5">
          <div className="py-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selected === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    onSelect(isSelected ? null : cat.key);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-gray-100 ${
                    isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {cat.icon}
                    {cat.label}
                  </span>
                  {isSelected && <Check size={16} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
