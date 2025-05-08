'use client';

import { useEffect, useState } from 'react';
import { en } from '../app/locales/en';
import { tr } from '../app/locales/tr';

export type Locale = {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    highlights: Array<{
      title: string;
      description: string;
    }>;
  };
  stats: {
    sections: Array<{
      value: string;
      label: string;
      description: string;
      icon: string;
    }>;
  };
  process: Array<{
    title: string;
    desc: string;
  }>;
  lead: {
    heading: string;
    subheading: string;
    form: {
      name: {
        label: string;
        placeholder: string;
      };
      company: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      phone: {
        label: string;
        placeholder: string;
      };
      message: {
        label: string;
        placeholder: string;
      };
      submit: string;
    };
    success: string;
  };
  footer: {
    copy: string;
    patent: string;
  };
  // ... existing types ...
};

// Default locale to prevent undefined errors
const defaultLocale: Locale = en;

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    const isTurkish = browserLang.startsWith('tr');

    // Set locale based on browser language
    setLocale(isTurkish ? tr : en);
  }, []);

  return locale;
}
