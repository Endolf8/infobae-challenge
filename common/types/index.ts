export interface ExaSubpage {
  id: string;
  url: string;
  title: string;
  author?: string;
  publishedDate?: string;
  text?: string;
  summary?: string;
  highlights?: string[];
  highlightScores?: number[];
}

export interface ExaSearchResult {
  id: string;
  title: string;
  url: string;
  publishedDate?: string;
  author?: string;
  score?: number;
  image?: string;
  favicon?: string;
  text?: string;
  summary?: string;
  highlights?: string[];
  highlightScores?: number[];
  subpages?: ExaSubpage[];
  extras?: {
    links?: string[];
    [key: string]: any;
  };
}
