"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const minTime = 1000;
    const startTime = Date.now();

    const complete = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minTime - elapsed);
      setTimeout(() => setIsReady(true), remaining);
    };

    if (document.readyState === "complete") {
      complete();
      return;
    }

    window.addEventListener("load", complete);
    const timeout = window.setTimeout(complete, 2500);

    return () => {
      window.removeEventListener("load", complete);
      window.clearTimeout(timeout);
    };
  }, []);

  if (isReady) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-light text-brand-dark transition-opacity duration-500">
      <div className="space-y-3 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        <p className="font-display text-sm uppercase tracking-[0.4em] text-brand">
          Nguyen Restaurant
        </p>
      </div>
    </div>
  );
}

