import '@/styles/globals.css';
import '@/styles/variables.css';
import 'animate.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'AI Research App',
  description: 'Investigación asistida por inteligencia artificial',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
