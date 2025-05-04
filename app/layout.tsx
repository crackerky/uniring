import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Serif_JP } from 'next/font/google';
import { Header } from '@/components/header/Header';

// Font configuration
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSerifJP = Noto_Serif_JP({ 
  weight: ['200', '300', '400', '500', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-serif-jp',
});

export const metadata: Metadata = {
  title: 'Üniring - 被害者も加害者もつくらない社会へ',
  description: '高校生発、ハラスメント未然防止教育プログラム。ハラスメントの未然防止を目指し、教育プログラムを提供しています。',
  keywords: 'ハラスメント,未然防止,教育プログラム,高校生,パワハラ,スクールハラスメント,ワークショップ',
  authors: [{ name: 'Üniring' }],
  openGraph: {
    title: 'Üniring - 被害者も加害者もつくらない社会へ',
    description: '高校生発、ハラスメント未然防止教育プログラム。ハラスメントの未然防止を目指し、教育プログラムを提供しています。',
    url: 'https://uniring.jp',
    siteName: 'Üniring',
    images: [
      {
        url: 'https://uniring.jp/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Üniring - ハラスメント未然防止教育プログラム',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Üniring - 被害者も加害者もつくらない社会へ',
    description: '高校生発、ハラスメント未然防止教育プログラム。ハラスメントの未然防止を目指し、教育プログラムを提供しています。',
    images: ['https://uniring.jp/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSerifJP.variable}`}>
      <head>
        <link rel="canonical" href="https://uniring.jp" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#FFBFC7" />
      </head>
      <body className="min-h-screen font-serif antialiased">
        <Header />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}