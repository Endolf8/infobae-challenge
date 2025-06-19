export const getTextContent = (text: string) => {
  const subtitlePattern = '**Subtitle:';
  const bodyPattern = '**Body:';

  const lines = text.split('\n').filter((line) => line.trim() !== '');

  let subtitle = '';
  let body = '';

  lines.forEach((line) => {
    if (line.startsWith(subtitlePattern)) {
      subtitle = line.replace(subtitlePattern, '').replace('**', '').trim();
    } else if (line.startsWith(bodyPattern)) {
      // El contenido del cuerpo comienza después de '**Body:'
      body += line.replace(bodyPattern, '').replace('**', '').trim() + '\n';
    } else {
      body += line + '\n'; // Para las líneas que no tengan formato especial
    }
  });

  // Regresamos el subtítulo y el cuerpo, sin el título
  return `**Subtitle:** ${subtitle}\n**Body:**\n${body}`;
};
