import { HTTP_STATUS } from '@/common/constants';
import { ExaSearchResult } from '@/common/types';
import { NextRequest } from 'next/server';

function shouldExpand(item: ExaSearchResult): boolean {
  if (typeof item.score === 'number') {
    return item.score >= 0.32;
  }

  const hasGoodTitle = item.title && item.title.length > 10;
  const hasSummary = item.summary && item.summary.length > 30;
  const hasAuthor = item.author && item.author.trim().length > 0;

  let score = 0;

  if (hasGoodTitle) score++;
  if (hasSummary) score++;
  if (hasAuthor) score++;

  return score >= 2;
}

export async function POST(req: NextRequest) {
  const { query, includeDomain, category } = await req.json();

  const payload = {
    query: query || '',
    includeDomains: includeDomain ? [includeDomain] : [],
    category: category || null,
    numResults: 20,
  };

  const res = await fetch('https://api.exa.ai/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.EXA_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (![HTTP_STATUS.ok].includes(res.status)) {
    return new Response(JSON.stringify({ error: 'Exa search failed' }), {
      status: res.status,
    });
  }

  const data = await res.json();

  const filteredResults =
    data.results?.filter(shouldExpand).map((item: any) => item) || [];

  return new Response(JSON.stringify({ results: filteredResults }), {
    status: HTTP_STATUS.ok,
  });
}
