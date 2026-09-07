"use client";

import { createContext, useState, useCallback } from "react";
import {
  getContactSettings,
  saveContactSettings as persistSettings,
} from "./contactSettings";

export const ContactSettingsContext = createContext(null);

export function ContactSettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => getContactSettings());

  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => {
      const merged = { ...prev, ...newSettings };
      persistSettings(merged);
      return merged;
    });
  }, []);

  return (
    <ContactSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </ContactSettingsContext.Provider>
  );
}
