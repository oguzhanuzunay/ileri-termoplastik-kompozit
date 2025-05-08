'use client';

import { useLocale } from '@/hooks/useLocale';

export function Footer() {
  const { footer } = useLocale();

  return (
    <footer className="w-full py-8 bg-slate-950 text-slate-400">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>{footer.copy}</div>
          <div>{footer.patent}</div>
        </div>
      </div>
    </footer>
  );
}
