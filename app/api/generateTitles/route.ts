import { HTTP_STATUS } from '@/common/constants';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod'; // Asegúrate de tener zod para definir el esquema

export async function POST(req: NextRequest) {
  try {
    const { contentText, count } = await req.json();

    if (!contentText || !count) {
      return NextResponse.json(
        { error: 'Falta el texto del contenido o la cantidad de títulos' },
        { status: HTTP_STATUS.notFound }
      );
    }

    // Definir el esquema para los títulos generados
    const titleSchema = z.object({
      title: z.string().describe('Generated title for the article.'),
    });

    // Crear un arreglo para almacenar los títulos generados
    const titles = [];

    // Crear el prompt que incluye instrucciones claras
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

    // Llamada a generateObject para obtener títulos
    const { object } = await generateObject({
      model: openai('gpt-4.1-nano'), // Usar el modelo adecuado
      output: 'array', // Queremos que la salida sea un arreglo de títulos
      schema: titleSchema, // Usamos el esquema definido para validar el formato
      prompt: prompt, // Pasamos el prompt más específico con el contexto
    });

    // Guardamos cada título generado en el arreglo
    for (const item of object) {
      titles.push(item.title);
    }

    return NextResponse.json({ titles }, { status: HTTP_STATUS.ok });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return NextResponse.json(
      { error: 'Error al generar los títulos' },
      { status: HTTP_STATUS.internalServerError }
    );
  }
}
