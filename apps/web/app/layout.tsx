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

const dashDigital = localFont({
  src: '../public/fonts/dash_digital.ttf',
  variable: '--font-dash-digital',
  display: 'swap',
});

export const metadata = {
  title: 'Spacedeck Protocol | Zero-Custody Execution Pipeline for Agents on Solana',
  description: 'Zero-custody execution rails to deploy proprietary math and protect algorithmic settlement.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${microgramma.variable} ${questrial.variable} ${bubbly.variable} ${dashDigital.variable}`}>
      <body className="bg-black">
        <Providers>
          {children}
          <VectorHud />
        </Providers>
      </body>
    </html>
  );
}
