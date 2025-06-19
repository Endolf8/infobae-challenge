import { HTTP_STATUS } from '@/common/constants';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const { contentText, count } = await req.json();

    if (!contentText || !count) {
      return NextResponse.json(
        { error: 'Falta el texto del contenido o la cantidad de títulos' },
        { status: HTTP_STATUS.notFound }
      );
    }

    const titleSchema = z.object({
      title: z.string().describe('Generated title for the article.'),
    });

    const titles = [];

    const prompt = `
Eres un editor profesional de contenido. Aquí tienes el contexto de un artículo:
${contentText}

Tu tarea es generar títulos atractivos, claros y concisos para este artículo. Los títulos deben resumir el tema del artículo y captar la atención de los lectores.

⚠️ Importante: 
- NO repitas el título original ni ninguna de sus versiones textuales.
- Cada título generado debe ser único y diferente entre sí.
- Evita sinónimos directos o reformulaciones triviales del original.
- Usa creatividad para encontrar ángulos nuevos o enfoques distintos sobre el mismo contenido.

Por favor, genera ${count} títulos únicos y breves para este artículo, manteniendo un tono profesional y orientado al lector.
`;

    const { object } = await generateObject({
      model: openai('gpt-4o'),
      output: 'array',
      schema: titleSchema,
      prompt: prompt,
    });

    for (const item of object) {
      titles.push(item.title);
    }

    return NextResponse.json({ titles }, { status: HTTP_STATUS.ok });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al generar los títulos' },
      { status: HTTP_STATUS.internalServerError }
    );
  }
}
