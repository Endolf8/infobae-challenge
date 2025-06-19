import textIcon from '@/public/assets/icon-text.svg';
import starIcon from '@/public/assets/icon-star.svg';
import iconClip from '@/public/assets/icon-clip.svg';
import iconClipWhite from '@/public/assets/icon-clip-white.svg';
import whiteStarIcon from '@/public/assets/icon-star-white.svg';
import textIconWhite from '@/public/assets/icon-text-white.svg';

export type ElementsProps = 'sources' | 'titles' | 'editor';

export interface SidebarElement {
  title: string;
  icon: string;
  iconActive: string;
  key: ElementsProps;
}

export const SIDEBAR_ELEMENTS: SidebarElement[] = [
  {
    title: 'Fuentes',
    icon: iconClip,
    iconActive: iconClipWhite,
    key: 'sources',
  },
  {
    title: 'Titulos',
    icon: textIcon,
    iconActive: textIconWhite,
    key: 'titles',
  },
  {
    title: 'Asistente',
    icon: starIcon,
    iconActive: whiteStarIcon,
    key: 'editor',
  },
];
