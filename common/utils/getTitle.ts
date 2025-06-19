export const getTitle = (text: string) => {
  const titlePattern = '**Title:';

  const lines = text.split('\n').filter((line) => line.trim() !== '');

  let title = '';

  lines.forEach((line) => {
    if (line.startsWith(titlePattern)) {
      title = line.replace(titlePattern, '').replace('**', '').trim();
    }
  });

  return title;
};
