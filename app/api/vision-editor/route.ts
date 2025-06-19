import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import type { CoreMessage } from 'ai';
import * as formidable from 'formidable';
import { HTTP_STATUS } from '@/common/constants';

export const maxDuration = 30;

const systemPrompt = `
Actuás como un redactor profesional de medios digitales, especializado en noticias para audiencias amplias.

Tu tarea es redactar un artículo periodístico claro, preciso y bien estructurado a partir de la imagen proporcionada por el usuario.

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
- Nunca incluyas frases que revelen que el texto fue generado por una IA o que sugieran futuras acciones, como: "esto podría expandirse", "podemos desarrollar más", "si querés profundizar", "como modelo de lenguaje", etc.
- No incluyas instrucciones o comentarios sobre el proceso de redacción.
- No describas la imagen literalmente, sino que lo interprétala y escribe a partir de la imagen con tus propias palabras.

Siempre entregá la respuesta en el formato indicado.`;

const systemMessage: CoreMessage = {
  role: 'system',
  content: systemPrompt,
};

function buildMessages(base64Image: string): CoreMessage[] {
  const userMessage: CoreMessage = {
    role: 'user',
    content: [
      {
        type: 'image',
        image: `data:image/jpeg;base64,${base64Image}`,
      },
    ],
  };

  return [systemMessage, userMessage];
}

type ParsedFile = Partial<formidable.File> & { buffer: Buffer };

const parseForm = async (req: Request): Promise<{ files: ParsedFile[] }> => {
  const formData = await req.formData();
  const imageFile = formData.get('image') as File;

  if (!imageFile) {
    throw new Error('No image file provided');
  }

  const fileBuffer = await imageFile.arrayBuffer();
  const fileData = Buffer.from(fileBuffer);

  const files: ParsedFile[] = [
    {
      originalFilename: imageFile.name,
      mimetype: imageFile.type,
      size: fileData.length,
      buffer: fileData,
    },
  ];

  return { files };
};

export async function POST(req: Request) {
  try {
    const { files } = await parseForm(req);

    const imageFile = Array.isArray(files) ? files[0] : files;

    if (!imageFile) {
      return new Response(JSON.stringify({ error: 'Faltan datos' }), {
        status: HTTP_STATUS.badRequest,
      });
    }

    const imageBuffer = imageFile.buffer;
    const base64Image = imageBuffer.toString('base64');

    const messages = buildMessages(base64Image);

    const result = await streamText({
      model: openai('gpt-4o'),
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
