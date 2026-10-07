'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { ROUTES, PRIMARY_NAV } from '@/config/routes';
import { WHATSAPP_TEL_HREF, buildWhatsAppUrl, WHATSAPP_GENERIC_MESSAGE } from '@/config/whatsapp';

import cateringLogo from '@/assets/Logos/Catering Logo.png';

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(currentScrollY > 20);

          if (currentScrollY <= 20) {
            // Near the top of the page, always show the header
            setVisible(true);
          } else if (currentScrollY > lastScrollYRef.current && currentScrollY > 80) {
            // Scrolling down -> hide the header
            setVisible(false);
          } else if (currentScrollY < lastScrollYRef.current) {
            // Scrolling up -> reveal the header
            setVisible(true);
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // When navigating to a new route, close the mobile drawer and show header
  useEffect(() => {
    setMobileOpen(false);
    setVisible(true);
  }, [pathname]);

  // When on the homepage and not scrolled down, the header sits on the dark hero image.
  // On all other subpages or when scrolled, the header sits on a white/light background.
  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        visible || mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      } ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-xs border-b border-soft-border'
      }`}
    >
      <div className="page-container">
        <nav className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Link href={ROUTES.home} className="relative z-10 flex-shrink-0 flex items-center">
            <Image
              src={cateringLogo}
              alt="Green Chillyz Catering"
              width={160}
              height={52}
              priority
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1.5">
            {PRIMARY_NAV.filter((item) => item.href !== '/').map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-3.5 py-2 text-sm font-medium rounded-(--radius-button) transition-all duration-200 ${
                      isTransparent
                        ? isActive
                          ? 'text-brand-yellow bg-white/20 font-semibold'
                          : 'text-white/90 hover:text-brand-yellow hover:bg-white/15'
                        : isActive
                          ? 'text-chef-black bg-pale-yellow font-semibold shadow-xs'
                          : 'text-chef-black hover:text-chilli-red hover:bg-pale-yellow/70'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={buildWhatsAppUrl(WHATSAPP_GENERIC_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-(--radius-button) transition-all duration-200 ${
                isTransparent
                  ? 'text-white/85 hover:text-brand-yellow hover:bg-white/15'
                  : 'text-chef-black hover:text-chilli-red hover:bg-pale-yellow'
              }`}
              aria-label="Chat on WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <Link
              href={ROUTES.contact}
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-chilli-red rounded-(--radius-button) hover:bg-brand-yellow hover:text-chef-black transition-all duration-200 shadow-xs"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile: Quote + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href={ROUTES.contact}
              className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-chilli-red rounded-(--radius-button) hover:bg-brand-yellow hover:text-chef-black transition-all duration-200"
            >
              Get a Quote
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`relative z-10 p-2.5 rounded-(--radius-button) transition-colors duration-200 ${
                mobileOpen
                  ? 'text-chef-black hover:bg-pale-yellow/60'
                  : isTransparent
                    ? 'text-white hover:bg-white/15'
                    : 'text-chef-black hover:text-chilli-red hover:bg-pale-yellow/60'
              }`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileOpen ? (
                  <>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-0 z-40 bg-white lg:hidden">
          <div className="pt-24 px-6 pb-8 h-full overflow-y-auto flex flex-col">
            <ul className="flex flex-col gap-1.5">
              {PRIMARY_NAV.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3.5 text-base font-medium rounded-(--radius-button) transition-colors duration-200 ${
                        isActive
                          ? 'bg-pale-yellow text-chef-black font-semibold border-l-4 border-chilli-red'
                          : 'text-chef-black hover:text-chilli-red hover:bg-pale-yellow/70'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-auto pt-6 flex flex-col gap-3 border-t border-soft-border">
              <a
                href={buildWhatsAppUrl(WHATSAPP_GENERIC_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20BD5A] rounded-(--radius-button) transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
              <a
                href={WHATSAPP_TEL_HREF}
                className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-chef-black border border-soft-border rounded-(--radius-button) hover:bg-pale-yellow/50 transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
