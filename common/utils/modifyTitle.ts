export const modifyTitle = (generado: string, newTitle: string) => {
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
  return `**Title:** ${title}\n**Subtitle:** ${subtitle}\n**Body:**\n${body}`;
};
