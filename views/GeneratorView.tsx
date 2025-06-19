'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ContentServices from '@/common/services/ContentServices';
import { ExaContent } from '@/common/types';
import ArticleServices from '@/common/services/ArticleServices';
import TitleGenerator from '@/common/components/TitleGenerator';
import MainSidebar from '@/common/components/MainSidebar';
import ElementSidebar from '@/common/components/ElementSidebar';
import { formatArticle } from '@/common/utils/formatArticle';
import { ElementsProps, SIDEBAR_ELEMENTS } from '@/common/constants/generator';
import { getTitle } from '@/common/utils/getTitle';
import { getTextContent } from '@/common/utils/getTextContent';
import EditorAssistantPanel from '@/common/components/EditorAssistantPanel/EditorAssistantPanel';
import Loading from '@/common/components/Loading';
import Img from '@/common/components/Img';
import infobaeLogo from '@/public/assets/Infobae-logo.svg';
import { modifyTitle } from '@/common/utils/modifyTitle';
import SourcesSelector from '@/common/components/SourcesSelector';
import { getArticleHtml } from '@/common/utils/getArticleHtml';

const GeneratorView = () => {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const [content, setContent] = useState<ExaContent | null>(null);
  const [generado, setGenerado] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [elementSeletected, setElementSeletected] = useState<ElementsProps>(
    url ? 'titles' : 'sources'
  );
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getContent = async (url: string) => {
    if (!url) return;
    setContent(null);

    const { ok, data } = await ContentServices.getContent(url);
    if (!ok || !data) {
      // TODO: Manejar caso de error
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
    setGenerado('');
    setIsLoading(true);

    const { ok, data } = await ArticleServices.requestStream({
      title,
      text,
      history,
    });

    if (!ok || !data) {
      // TODO: Manejar error
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      setGenerado((prev) => prev + chunk);
    }
    setIsLoading(false);
  };

  const handlePromptSubmit = async () => {
    if (!generado || !customPrompt.trim()) return;

    const nuevaHistoria = [...history, customPrompt.trim()];
    setHistory(nuevaHistoria);
    setCustomPrompt('');

    let title = getTitle(generado);
    let body = getTextContent(generado);

    const nuevoTexto = `**Title:** ${title}\n**Body:**\n${body}`;
    await handleGenerate({
      title: title,
      text: nuevoTexto,
      history: nuevaHistoria,
    });
  };

  const handleGenerateFromImage = async (image: File) => {
    setGenerado('');
    setIsLoading(true);

    const { ok, data } = await ArticleServices.requestStreamFromImage(image);
    setIsLoading(false);

    if (!ok || !data) {
      // TODO: Manejar error
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      setGenerado((prev) => prev + chunk);
    }
  };
  const getElementSidebar = () => {
    switch (elementSeletected) {
      case 'sources':
        return (
          <SourcesSelector
            handleGenerateFromImage={handleGenerateFromImage}
            isLoading={isLoading}
            getContent={getContent}
          />
        );
      case 'titles':
        return (
          <TitleGenerator
            title={getTitle(generado)}
            contentText={getTextContent(generado)}
            setGeneratedTitles={setGeneratedTitles}
            generatedTitles={generatedTitles}
            handleSaveCustomTitle={(e) => setGenerado(modifyTitle(generado, e))}
          />
        );
      case 'editor':
        return (
          <EditorAssistantPanel
            customPrompt={customPrompt}
            history={history}
            setCustomPrompt={setCustomPrompt}
            handlePromptSubmit={handlePromptSubmit}
          />
        );

      default:
        return <div className="p-4">Selecciona una opción del menú</div>;
    }
  };

  useEffect(() => {
    if (url && !content) {
      getContent(url);
    }
  }, [url]);

  const handleDownloadPDF = async () => {
    const htmlContent = getArticleHtml(generado);

    const container = document.createElement('div');
    container.innerHTML = htmlContent;

    const html2pdf = (await import('html2pdf.js')).default;
    html2pdf()
      .from(container)
      .set({
        margin: 10,
        filename: 'articulo-generado.pdf',
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] },
      })
      .save();
  };

  return (
    <main className="flex w-screen h-screen relative overflow-hidden bg-n1">
      <div className="flex">
        <MainSidebar
          elements={
            url
              ? SIDEBAR_ELEMENTS.filter((e) => e.key !== 'sources')
              : SIDEBAR_ELEMENTS
          }
          onClickElement={(key) => {
            if (!url && !content) return;
            setElementSeletected(key);
          }}
          elementSeletected={elementSeletected}
        />
        <ElementSidebar>{getElementSidebar()}</ElementSidebar>
      </div>
      <div className="  flex flex-col items-center mx-auto  pt-4 flex-1 ">
        {generado && (
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 !bg-p1 text-n10 absolute bottom-6 right-6 z-modal rounded hover:bg-n8 shadow-e3"
          >
            Descargar como PDF
          </button>
        )}
        {generado ? (
          <div className="bg-n0  p-6 max-w-3xl gap-4  flex flex-col flex-1 rounded-t-md shadow-e1 overflow-y-auto">
            <Img
              src={infobaeLogo}
              alt="Infobae Logo"
              className="h-4 ml-[-5.5rem]"
            />

            {generado && (
              <article className="font-serif space-y-3">
                {formatArticle(generado)}
              </article>
            )}
          </div>
        ) : !url ? (
          <div className="flex items-center justify-center flex-col flex-1">
            <Img src={infobaeLogo} alt="Infobae Logo" className="h-36" />
            <p className="text-h4 text-n10 text-center">
              Descubrí lo que vale la pena investigar.
            </p>
          </div>
        ) : (
          <Loading title="Redactando" />
        )}
      </div>
    </main>
  );
};

export default GeneratorView;
