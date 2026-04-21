import './globals.css';
import { Providers } from './providers';
import localFont from 'next/font/local';
import { Questrial } from 'next/font/google';
import { VectorHud } from '../components/vector-hud';

const questrial = Questrial({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-questrial',
  display: 'swap',
});

const microgramma = localFont({
  src: '../public/fonts/microgrammanormal.ttf',
  variable: '--font-microgramma',
  display: 'swap',
});

const bubbly = localFont({
  src: '../public/fonts/bubblyfont.otf',
  variable: '--font-bubbly',
  display: 'swap',
});

export const metadata = {
  title: 'Spacedeck-App | Institutional Yield Abstraction',
  description: 'Omnichain yield abstraction engine for the agentic economy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${microgramma.variable} ${questrial.variable} ${bubbly.variable}`}>
      <body className="bg-black">
        <Providers>
          {children}
          <VectorHud />
        </Providers>
      </body>
    </html>
  );
}
