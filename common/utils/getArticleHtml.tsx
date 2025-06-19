export const getArticleHtml = (text: string): string => {
  const lines = text.split('\n').filter((line) => line.trim() !== '');

  return lines
    .map((line) => {
      if (line.startsWith('**Title:')) {
        const title = line.replace('**Title:', '').replace('**', '').trim();
        return `<h1 style="font-size: 28px; font-weight: bold; margin-bottom: 20px;">${title}</h1>`;
      }

      if (line.startsWith('**Subtitle:')) {
        const subtitle = line
          .replace('**Subtitle:', '')
          .replace('**', '')
          .trim();
        return `<p style="font-style: italic; color: #555; margin-bottom: 16px;">${subtitle}</p>`;
      }

      if (line.startsWith('**Body:**')) {
        return ''; // omit label
      }

      return `<p style="font-size: 14px; line-height: 1.6; margin-bottom: 12px;">${line}</p>`;
    })
    .join('');
};
