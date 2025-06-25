'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import ContentServices from '@/common/services/ContentServices';
import { ExaContent } from '@/common/types';
import ArticleServices, {
  GenerateInput,
} from '@/common/services/ArticleServices';
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
import { modifyTitle } from '@/common/utils/modifyTitle';
import SourcesSelector from '@/common/components/SourcesSelector';
import infobaeLogo from '@/public/assets/Infobae-logo.svg';
import { toast } from 'sonner';
import handleDownloadPDF from '@/common/utils/handleDownloadPDF';

const GeneratorView = () => {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const [content, setContent] = useState<ExaContent | null>(null);
  const [generatedContent, setGeneratedContent] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [elementSeletected, setElementSeletected] = useState<ElementsProps>(
    url ? 'titles' : 'sources'
  );
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const contentRef = useRef('');
  const animationFrameRef = useRef<number | null>(null);

  const getContent = async (url: string) => {
    if (!url) {
      toast.error('Por favor, proporciona una URL válida.');
      return;
    }
    setContent(null);
    const { ok, data } = await ContentServices.getContent(url);
    if (!ok || !data) {
      toast.error('Ocurrío un error inténtalo de nuevo más tarde.');
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
  }: GenerateInput) => {
    contentRef.current = '';
    setGeneratedContent('');
    setIsLoading(true);

    const { ok, data } = await ArticleServices.requestStream({
      title,
      text,
      history,
    });

    if (!ok || !data) {
      toast.error('Ocurrío un error inténtalo de nuevo más tarde.');
      setIsLoading(false);
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder('utf-8');

    const readChunk = async () => {
      const { done, value } = await reader.read();
      if (done) {
        setGeneratedContent(contentRef.current);
        setIsLoading(false);
        return;
      }

      const chunk = decoder.decode(value, { stream: true });
      contentRef.current += chunk;

      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(() => {
          setGeneratedContent(contentRef.current);
          animationFrameRef.current = null;
        });
      }

      readChunk();
    };

    readChunk();
  };

  const handlePromptSubmit = async () => {
    if (!generatedContent || !customPrompt.trim()) return;

    const newHistory = [...history, customPrompt.trim()];
    setHistory(newHistory);
    setCustomPrompt('');

    const title = getTitle(generatedContent);
    const body = getTextContent(generatedContent);

    const newText = `**Title:** ${title}\n**Body:**\n${body}`;
    await handleGenerate({
      title: title,
      text: newText,
      history: newHistory,
    });
  };

  const getElementSidebar = () => {
    switch (elementSeletected) {
      case 'sources':
        return (
          <SourcesSelector
            isLoading={isLoading}
            getContent={getContent}
            setGeneratedContent={setGeneratedContent}
            setIsLoading={setIsLoading}
          />
        );
      case 'titles':
        return (
          <TitleGenerator
            title={getTitle(generatedContent)}
            contentText={getTextContent(generatedContent)}
            setGeneratedTitles={setGeneratedTitles}
            generatedTitles={generatedTitles}
            handleSaveCustomTitle={(e) =>
              setGeneratedContent(modifyTitle(generatedContent, e))
            }
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
            if (!url && !content && !generatedContent) return;
            setElementSeletected(key);
          }}
          elementSeletected={elementSeletected}
        />
        <ElementSidebar>{getElementSidebar()}</ElementSidebar>
      </div>
      <div className="flex flex-col items-center mx-auto pt-4 flex-1">
        {generatedContent && !isLoading && (
          <button
            onClick={() => handleDownloadPDF(generatedContent)}
            className="px-4 py-2 !bg-p1 text-n10 absolute bottom-6 right-6 z-modal rounded hover:bg-n8 shadow-e3"
          >
            Descargar como PDF
          </button>
        )}
        {generatedContent ? (
          <div className="bg-n0 p-6 max-w-3xl gap-4 flex flex-col flex-1 rounded-t-md shadow-e1 overflow-y-auto">
            <Img
              src={infobaeLogo}
              alt="Infobae Logo"
              className="h-4 ml-[-5.5rem]"
            />
            <article className="font-serif space-y-3">
              {formatArticle(generatedContent)}
            </article>
          </div>
        ) : !url && !isLoading ? (
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
