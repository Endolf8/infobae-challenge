import { NextRequest, NextResponse } from 'next/server';
import { HTTP_STATUS } from '@/common/constants';

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json(
      { error: 'Falta la URL' },
      { status: HTTP_STATUS.notFound }
    );
  }

  const exaResponse = await fetch('https://api.exa.ai/contents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.EXA_API_KEY}`,
    },
    body: JSON.stringify({
      urls: [url],
      text: true,
    }),
  });

  if (exaResponse.status !== HTTP_STATUS.ok) {
    const err = await exaResponse.text();
    // eslint-disable-next-line no-console
    console.error('Error de Exa:', err);
    return NextResponse.json(
      { error: 'Error desde Exa' },
      { status: exaResponse.status }
    );
  }

  const exaData = await exaResponse.json();

  return new Response(JSON.stringify(exaData.results[0]), {
    status: HTTP_STATUS.ok,
  });
}
