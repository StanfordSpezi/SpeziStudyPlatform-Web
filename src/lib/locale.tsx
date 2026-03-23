//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  createContext,
  use,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface LocaleContextValue {
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const storageKey = (studyId: string) => `locale:${studyId}`;

interface LocaleProviderProps {
  studyId: string;
  supportedLocales: string[];
  children: ReactNode;
}

export const LocaleProvider = ({
  studyId,
  supportedLocales,
  children,
}: LocaleProviderProps) => {
  const localStorageKey = storageKey(studyId);
  const fallback = supportedLocales[0] ?? "en-US";
  const [locale, setLocale] = useState(() => {
    const storedLocale = localStorage.getItem(localStorageKey);
    return storedLocale && supportedLocales.includes(storedLocale) ?
        storedLocale
      : fallback;
  });

  useEffect(() => {
    if (!supportedLocales.includes(locale)) {
      setLocale(fallback);
    }
  }, [supportedLocales, locale, fallback]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, locale);
  }, [localStorageKey, locale]);

  return (
    <LocaleContext value={{ locale, setLocale }}>{children}</LocaleContext>
  );
};

export const useLocale = (): LocaleContextValue => {
  const context = use(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
