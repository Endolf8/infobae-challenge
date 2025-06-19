README.md

# Infobae Challenge - Herramienta de Investigación con IA

Este proyecto es una aplicación Next.js que integra el SDK de IA de Vercel con la API de Exa para proporcionar funcionalidades de investigación automatizada para creadores de contenido. La herramienta ayuda a los usuarios a iniciar investigaciones sobre temas específicos, categorizar resultados y generar contenido basado en esos hallazgos asistido por IA.

## Despliegue

La aplicación se despliega automáticamente en Vercel y puede accederse en [https://infobae-challenge-iota.vercel.app](https://infobae-challenge-iota.vercel.app/).

## Funcionalidades

1. **Página de Investigación**: Navegá a la página principal e ingresá una consulta de investigación personalizada en la barra de búsqueda. Elegí el tipo de investigación que deseas realizar para obtener resultados más relevantes.
2. **Ver Resultados**: Examiná los resultados de investigación categorizados y elegí un tema que te interese. Podés leer el artículo original para chequear si vale la pena expandirlo.
3. **Expandir Contenido**: Hacé clic en "Expandir" para cualquier tema que valga la pena para generar un borrador de artículo basado en los resultados de investigación. La herramienta generará un artículo inicial automáticamente utilizando la API de Exa y OpenAI.
4. **Generación por URL/Imagen**: alternativamente también podés usar [el generador](https://infobae-challenge-iota.vercel.app) (haciendo click en el ícono de crear) para subir una imagen o URL de tu elección para generar un artículo basado en ese contenido.
5. **Generación de Títulos**: podés generar títulos para tu artículo utilizando la funcionalidad de generación de títulos. Podés elegir entre un número de títulos sugeridos y seleccionar el que más te guste o modificarlo según tus necesidades.
6. **Editar Contenido**: usá el asistente de IA para editar el contenido generado, refinando el artículo según tus preferencias.
7. **Exportar Artículo**: una vez que estés satisfecho con el artículo, podés exportarlo en formato PDF para compartirlo.

## Ejecutar el Proyecto

### Prerequisitos

- Node.js (v18 o más reciente)
- npm o yarn
- API Keys para Exa y OpenAI

### Servidor Local

1. Instalar dependencias:

bash
npm install

# o

yarn install

2. Crear un archivo `.env.local` en el directorio raíz completando las siguientes variables:

EXA_API_KEY=exa_api_key
OPENAI_API_KEY=openai_api_key

3. Ejecutar el servidor de desarrollo:

bash
npm run dev

# o

yarn dev

4. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

### Build de Producción

Para compilar la aplicación para producción:

bash
npm run build

# o

yarn build

Para iniciar el servidor de producción:

bash
npm start

# o

yarn start

## Stack Tecnológico

- **Frontend**: Next.js + TypeScript
- **Estilos**: Tailwind CSS
- **Integración API**: Vercel AI SDK, Exa API, OpenAI API
- **Despliegue**: Vercel

## Mejoras Futuras

- Implementar autenticación de usuarios para investigación personalizada
- Añadir funcionalidad de guardado, exportación y publicación de resultados de investigación
- Mejorar el algoritmo de categorización con criterios más personalizados
- Añadir características colaborativas para creación de contenido en equipo
- Implementar analíticas de contenido para rastrear el rendimiento de los artículos generados
