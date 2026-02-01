"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CartButton } from "./cart/CartButton";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavBarProps {
  lang?: "de" | "en" | "vi";
}

const navLinks = {
  de: [
    { label: "Über uns", href: "#geschichten" },
    { label: "Speisekarte", href: "#speisekarte" },
    { label: "Unser Restaurant", href: "#gallery" },
    { label: "Anfahrt", href: "/location" }
  ],
  en: [
    { label: "About Us", href: "#geschichten" },
    { label: "Menu", href: "#speisekarte" },
    { label: "Our Restaurant", href: "#gallery" },
    { label: "Location", href: "/en/location" }
  ],
  vi: [
    { label: "Về chúng tôi", href: "#geschichten" },
    { label: "Thực đơn", href: "#speisekarte" },
    { label: "Nhà hàng", href: "#gallery" },
    { label: "Địa chỉ", href: "/vi/location" }
  ]
};

export function NavBar({ lang = "de" }: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = navLinks[lang];

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [mobileOpen]);

  const baseClasses =
    "fixed inset-x-0 top-0 z-50 border-b border-brand-light/10 bg-brand/90 backdrop-blur transition-all duration-300";

  return (
    <>
      <header className={baseClasses}>
        <div className="flex w-full items-center justify-between px-6 py-4 lg:px-12">
          <Link
            href={lang === "de" ? "/" : `/${lang}`}
            className="font-display text-2xl text-white drop-shadow transition hover:text-brand-accent"
          >
            Nguyen Restaurant
          </Link>

          <nav className="hidden items-center gap-4 text-sm font-medium text-white sm:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-brand-accent/80"
              >
                {link.label}
              </a>
            ))}

            <LanguageSwitcher />
            <CartButton />
          </nav>

          <div className="flex items-center gap-3 sm:hidden">
            <CartButton />
            <button
              type="button"
              aria-label={mobileOpen ? "Navigation schließen" : "Navigation öffnen"}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-light/20 bg-brand-light/10 text-white transition hover:border-white hover:bg-brand-light/20"
            >
              <span className="sr-only">
                {mobileOpen ? "Navigation schließen" : "Navigation öffnen"}
              </span>
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-brand-dark/80 backdrop-blur transition-opacity duration-300 sm:hidden ${mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        onClick={() => setMobileOpen(false)}
      />

      <nav
        className={`fixed inset-x-0 top-0 z-50 mt-[72px] flex origin-top flex-col gap-4 bg-gray-950/95 px-6 py-10 text-sm text-white shadow-2xl transition-transform duration-300 sm:hidden ${mobileOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          }`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-base font-semibold uppercase tracking-[0.35em] transition hover:text-brand-accent/80"
          >
            {link.label}
          </a>
        ))}

        <a
          href="/coupon"
          onClick={() => setMobileOpen(false)}
          className="rounded-full border border-brand-light/20 px-4 py-2 text-center text-base font-semibold uppercase tracking-[0.35em] text-white transition hover:border-yellow-300 hover:text-brand-accent"
        >
          {lang === "de" ? "Gutscheine" : lang === "en" ? "Coupons" : "Phiếu giảm giá"}
        </a>
        <div className="flex justify-center border-t border-brand-light/10 pt-4">
          <LanguageSwitcher />
        </div>
      </nav>
    </>
  );
}

