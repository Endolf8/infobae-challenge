import '@/styles/variables.css';
import 'animate.css';
import '@/styles/globals.css';
import Toast from '@/common/components/Toast';

export const metadata = { title: 'Infobae', description: 'Asistente de notas' };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Toast />
        {children}
      </body>
    </html>
  );
}
