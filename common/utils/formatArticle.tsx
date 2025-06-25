export const formatArticle = (text: string) => {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const sections: {
    title?: string;
    subtitle?: string;
    body: string[];
  }[] = [];

  let currentSection = { title: '', subtitle: '', body: [] as string[] };

  for (const line of lines) {
    if (line.startsWith('**Title:**')) {
      if (
        currentSection.body.length ||
        currentSection.title ||
        currentSection.subtitle
      ) {
        sections.push({ ...currentSection });
        currentSection = { title: '', subtitle: '', body: [] };
      }
      currentSection.title = line.replace('**Title:**', '').trim();
    } else if (line.startsWith('**Subtitle:**')) {
      currentSection.subtitle = line.replace('**Subtitle:**', '').trim();
    } else if (line.startsWith('**Body:**')) {
    } else {
      currentSection.body.push(line);
    }
  }

  if (
    currentSection.body.length ||
    currentSection.title ||
    currentSection.subtitle
  ) {
    sections.push(currentSection);
  }

  return sections.map((section, i) => (
    <div key={i} className="mb-8">
      {section.title && (
        <h1 className="text-4xl font-extrabold mb-4">{section.title}</h1>
      )}
      {section.subtitle && (
        <p className="text-lg text-gray-600 italic mb-4">{section.subtitle}</p>
      )}
      {section.body.map((p, idx) => (
        <p key={idx} className="mb-4 leading-relaxed text-base">
          {p}
        </p>
      ))}
    </div>
  ));
};
