'use client';
import ArticleServices from '@/common/services/ArticleServices';
import ContentServices from '@/common/services/ContentServices';
import { ExaContent } from '@/common/types';
import { formatArticle } from '@/common/utils/formatArticle';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const GeneratorView = () => {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const [content, setContent] = useState<ExaContent | null>(null);
  const [generado, setGenerado] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const getContent = async () => {
    if (!url) return;
    setContent(null);

    const { ok, data } = await ContentServices.getContent(url);
    if (!ok || !data) {
      ///TODO: Handle error case
      return;
    }

    setContent(data);
    await handleGenerate({
      title: data.title,
      text: data.text,
      history: [],
    });
  };

  const handleGenerate = async ({
    title,
    text,
    history = [],
  }: {
    title: string;
    text: string;
    history: string[];
  }) => {
    setIsComplete(false);
    setGenerado('');

    const { ok, data } = await ArticleServices.requestStream({
      title,
      text,
      history,
    });

    if (!ok || !data) {
    }

    const reader = data.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      setGenerado((prev) => prev + chunk);
    }

    setIsComplete(true);
  };

  const handlePromptSubmit = async () => {
    if (!content || !customPrompt.trim()) return;
    const nuevaHistoria = [...history, customPrompt.trim()];
    setHistory(nuevaHistoria);
    setCustomPrompt('');
    await handleGenerate({
      title: content.title,
      text: content.text,
      history: nuevaHistoria,
    });
  };

  useEffect(() => {
    if (url && !content) {
      getContent();
    }
  }, [url]);

  return (
    <main className="p-6 max-w-3xl mx-auto relative">
      <h3 className="text-xl font-bold mb-4">
        {new Date().toLocaleDateString('es-AR')}
      </h3>
      {generado && (
        <article className="font-serif space-y-3">
          {formatArticle(generado)}
        </article>
      )}

      {generado && isComplete && (
        <div className="fixed bottom-6 right-6 w-full max-w-md p-4 bg-white border shadow-xl rounded-lg z-50 animate__animated animate__slideInRight">
          <label className="block mb-2 font-medium text-sm">
            ¿Querés hacer un cambio?
          </label>
          <input
            type="text"
            placeholder="Ej: Redactalo en tono más informal"
            className="w-full border px-3 py-2 rounded mb-2 text-sm"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
          <button
            onClick={handlePromptSubmit}
            className="bg-black text-white text-sm px-4 py-2 rounded"
          >
            Reescribir con AI
          </button>
        </div>
      )}
    </main>
  );
};

export default GeneratorView;
