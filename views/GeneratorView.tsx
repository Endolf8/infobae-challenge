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

  const modifyTitle = (generado: string, newTitle: string) => {
    const titlePattern = '**Title:';
    const subtitlePattern = '**Subtitle:';
    const bodyPattern = '**Body:';

    const lines = generado.split('\n').filter((line) => line.trim() !== '');

    let title = newTitle;
    let subtitle = '';
    let body = '';

    lines.forEach((line) => {
      if (line.startsWith(titlePattern)) {
        title = newTitle;
      } else if (line.startsWith(subtitlePattern)) {
        subtitle = line.replace(subtitlePattern, '').replace('**', '').trim();
      } else if (line.startsWith(bodyPattern)) {
        body += line.replace(bodyPattern, '').replace('**', '').trim() + '\n';
      } else {
        body += line + '\n';
      }
    });

    setGenerado(
      `**Title:** ${title}\n**Subtitle:** ${subtitle}\n**Body:**\n${body}`
    );
  };

  const getContent = async () => {
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

  const getElementSidebar = () => {
    if (!content) return null;
    switch (elementSeletected) {
      case 'titles':
        return (
          <TitleGenerator
            title={getTitle(generado)}
            contentText={getTextContent(generado)}
            setGeneratedTitles={setGeneratedTitles}
            generatedTitles={generatedTitles}
            handleSaveCustomTitle={(e) => modifyTitle(generado, e)}
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
      getContent();
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
            setElementSeletected(key);
          }}
          elementSeletected={elementSeletected}
        />
        <ElementSidebar>{getElementSidebar()}</ElementSidebar>
      </div>
      <div className="  flex flex-col items-center mx-auto  pt-4 flex-1 ">
        {generado ? (
          <div className="bg-n0  p-6 max-w-3xl gap-4  flex flex-col flex-1 rounded-t-md shadow-e1 overflow-y-auto">
            <Img
              src={infobaeLogo}
              alt="Infobae Logo"
              className="h-4 ml-[-5.5rem]"
            />

            {generado && (
              <article className="font-serif space-y-3 ">
                {formatArticle(generado)}
              </article>
            )}
          </div>
        ) : (
          <Loading title="Redactando" />
        )}
      </div>
    </main>
  );
};

export default GeneratorView;
