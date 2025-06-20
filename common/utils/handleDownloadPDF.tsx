import { getArticleHtml } from './getArticleHtml';

const handleDownloadPDF = async (generatedContent: string) => {
  const htmlContent = getArticleHtml(generatedContent);

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
export default handleDownloadPDF;
