import { ExaContent, ExaSearchResult } from '../types';
import { Result } from './types';

interface ContentServicesProps {
  getContent: (url: string) => Promise<Result<ExaContent>>;
}

const ContentServices: ContentServicesProps = {
  getContent: async (url: string) => {
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
      }),
    });
    if (!res.ok) return { ok: false, data: null };

    const data = await res.json();
    return {
      ok: res.ok,
      data: data || null,
    };
  },
};

export default ContentServices;
