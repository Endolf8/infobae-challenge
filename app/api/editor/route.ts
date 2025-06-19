import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import type { CoreMessage } from 'ai';
import { HTTP_STATUS } from '@/common/constants';

export const maxDuration = 30;

const systemPrompt = `
Actuás como un redactor profesional de medios digitales, especializado en noticias para audiencias amplias.

Tu tarea es redactar un artículo periodístico claro, preciso y bien estructurado a partir del contenido proporcionado por el usuario.

Debés generar siempre:

- Un **título** atractivo, breve y original. No debe ser una copia literal del texto original.
- Una **bajada** o subtítulo que complemente el título con un resumen llamativo del tema.
- Un **cuerpo** de texto informativo que desarrolle el tema con un estilo objetivo, claro y orientado al lector digital.

Formato de salida (usa siempre esta estructura):

**Title:** [título generado]  
**Subtitle:** [bajada generada]  
**Body:**  
[contenido redactado]

Pautas:
- Escribí en español neutro.
- Usá frases cortas, párrafos de no más de 4 líneas.
- El texto debe estar redactado desde cero, pero basado en el contenido que se te entrega como referencia.
- Evitá adjetivos innecesarios y mantené un tono profesional.
-  Nunca incluyas frases que revelen que el texto fue generado por una IA o que sugieran futuras acciones, como: "esto podría expandirse", "podemos desarrollar más", "si querés profundizar", "como modelo de lenguaje", etc.
- No incluyas instrucciones o comentarios sobre el proceso de redacción.
- No repitas el contenido original palabra por palabra, sino que lo sintetizás y lo reescribís con tus propias palabras.

Siempre entregá la respuesta en el formato indicado.`;

const systemMessage: CoreMessage = {
  role: 'system',
  content: systemPrompt,
};

function buildMessages(
  title: string,
  text: string,
  history: string[] = []
): CoreMessage[] {
  const userMessage: CoreMessage = {
    role: 'user',
    content: `
    Título sugerido: ${title}
    Contenido base:${text}`,
  };
  const historyMessages: CoreMessage[] = history.map((entry) => ({
    role: 'user',
    content: entry,
  }));

  return [systemMessage, userMessage, ...historyMessages];
}

export async function POST(req: Request) {
  try {
    const { title, text, history = [] } = await req.json();

    if (!title || !text) {
      return new Response(JSON.stringify({ error: 'Faltan datos' }), {
        status: HTTP_STATUS.notFound,
      });
    }

    const messages = buildMessages(title, text, history);

    const result = await streamText({
      model: openai('gpt-4.1-nano'),
      messages,
    });

    return new Response(result.textStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: HTTP_STATUS.internalServerError,
    });
  }
}
