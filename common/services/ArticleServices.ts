import { Result } from './types';

interface GenerateInput {
  title: string;
  text: string;
  history: string[];
}

interface ArticleServicesProps {
  requestStream: (props: GenerateInput) => Promise<Result<any | null>>;
}

const ArticleServices: ArticleServicesProps = {
  requestStream: async ({
    title,
    text,
    history,
  }: GenerateInput): Promise<Result<Body['body'] | null>> => {
    try {
      const res = await fetch('/api/editor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, text, history }),
      });

      if (!res.ok) return { ok: false, data: null };

      return {
        ok: res.ok,
        data: res.body,
      };
    } catch (err) {
      return { ok: false, data: null };
    }
  },
};

export default ArticleServices;
