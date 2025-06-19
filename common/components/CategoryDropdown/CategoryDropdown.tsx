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
    <div className="relative inline-block text-left z-modal">
      <button
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-sm  text-sm ',
          selected ? 'bg-p1 text-n0' : 'bg-n0 hover:bg-n1'
        )}
      >
        <Settings2 size={16} />
        Tipo
      </button>

      {open && (
        <div className="absolute animate__animated animate__fadeIn animate__fast mt-2 w-44 left-[-6rem] animate z-modal overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5">
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
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm ${
                    isSelected
                      ? 'bg-p1 text-n0'
                      : 'text-n10 hover:bg-p1-25 hover:text-n0'
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
