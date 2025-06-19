export const formatArticle = (text: string) => {
  const lines = text.split('\n').filter((line) => line.trim() !== '');

  return lines.map((line, i) => {
    if (line.startsWith('**Title:')) {
      return (
        <h1 key={i} className="text-4xl font-extrabold mb-6">
          {line.replace('**Title:', '').replace('**', '').trim()}
        </h1>
      );
    }

    if (line.startsWith('**Subtitle:')) {
      return (
        <p key={i} className="text-lg text-gray-600 italic mb-4">
          {line.replace('**Subtitle:', '').replace('**', '').trim()}
        </p>
      );
    }

    if (line.startsWith('**Body:**')) {
      return null;
    }

    return (
      <p key={i} className="mb-4 leading-relaxed text-base">
        {line}
      </p>
    );
  });
};
