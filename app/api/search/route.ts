import { HTTP_STATUS } from '@/common/constants';
import { ExaSearchResult } from '@/common/types';
import { NextRequest } from 'next/server';

function shouldExpand(item: ExaSearchResult): boolean {
  const hasMinScore = typeof item.score !== 'number' || item.score >= 0.25;
  const hasGoodTitle = item.title && item.title.length > 10;
  const hasSummary = item.summary && item.summary.length > 30;
  const hasAuthor = item.author && item.author.trim().length > 0;

  let score = 0;

  if (hasMinScore) score++;
  if (hasGoodTitle) score++;
  if (hasSummary) score++;
  if (hasAuthor) score++;

  return score >= 3; // At least 3 out of 4 criteria must be met
}

export async function POST(req: NextRequest) {
  const { query, category } = await req.json();

  const payload = {
    query: query || '',
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

  const expand: ExaSearchResult[] = [];
  const noExpand: ExaSearchResult[] = [];

  data.results.forEach((item: ExaSearchResult) => {
    shouldExpand(item) ? expand.push(item) : noExpand.push(item);
  });

  return new Response(JSON.stringify({ expand, noExpand }), {
    status: HTTP_STATUS.ok,
  });
}
