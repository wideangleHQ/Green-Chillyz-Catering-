import type { Metadata } from 'next';
import { ROUTES } from '@/config/routes';

// page.tsx is a client component and cannot export metadata; without this the
// root layout's canonical ('/') would apply to /faq.
export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Straight answers on what we cater, where we cater, how menus work and how quotations are prepared.',
  alternates: { canonical: ROUTES.faq },
};

export default function FaqLayout({ children }: LayoutProps<'/faq'>) {
  return children;
}
