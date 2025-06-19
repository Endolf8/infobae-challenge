import React from 'react';
import Img from '../Img';
import cn from '@/common/utils/classNames';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface MainSidebarProps {
  elementSeletected: string | null;
  elements: {
    title: string;
    icon: string | StaticImport;
    iconActive: string | StaticImport;
    key: string;
  }[];
  onClickElement: (key: string) => void;
}

const MainSidebar = ({
  elements,
  elementSeletected,
  onClickElement,
}: MainSidebarProps) => {
  return (
    <div className="h-screen bg-n0 shadow-e2 animate__animated pt-8 border-r border-n2 animate__slideInLeft  z-20">
      {elements.map((el, index) => (
        <button
          key={index}
          className={cn(
            'flex flex-col  items-center gap-2 p-4  transition-colors w-full text-left',
            elementSeletected === el.key
              ? 'bg-p1 text-n0  animate__animated animate__fadeIn animate__faster shadow-e3 '
              : 'hover:bg-p1-25 transition-colors'
          )}
          onClick={() => onClickElement(el.key)}
        >
          <Img
            src={elementSeletected === el.key ? el.iconActive : el.icon}
            alt={el.title}
            width={24}
            height={24}
            className="w-12 h-12"
          />
          <span className=" s">{el.title}</span>
        </button>
      ))}
    </div>
  );
};

export default MainSidebar;
