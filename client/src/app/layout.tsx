import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFab from '@/components/common/WhatsAppFab';
import StructuredData from '@/components/common/StructuredData';
import { SITE } from '@/config/site';
import { SITE_URL } from '@/config/siteUrl';
import './globals.css';

const manrope = localFont({
  src: '../../public/fonts/Manrope-VariableFont_wght.ttf',
  variable: '--font-manrope',
  display: 'swap',
  weight: '200 800',
});

const anton = localFont({
  src: '../../public/fonts/Anton-Regular.ttf',
  variable: '--font-anton',
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Catering in ${SITE.primaryCity}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    `${SITE.descriptor} across ${SITE.serviceArea}. ` +
    'Weddings, receptions, corporate, office, private, outdoor, house party and institutional catering, ' +
    'with customised menus, live food counters and full on-site setup and service.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_IN',
    url: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/icons/logo.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${manrope.variable} ${anton.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-chilli-red focus:text-white focus:rounded-(--radius-button) focus:text-sm focus:font-bold shadow-md"
        >
          Skip to content
        </a>
        <StructuredData />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
