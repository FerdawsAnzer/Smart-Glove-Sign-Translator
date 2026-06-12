import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";
import ar from "./locales/ar/translation.json";
import tr from "./locales/tr/translation.json";

import enData from "./locales/en/data.json";
import frData from "./locales/fr/data.json";
import arData from "./locales/ar/data.json";
import trData from "./locales/tr/data.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: { ...en, data: enData } }, 
      fr: { translation: { ...fr, data: frData } }, 
      ar: { translation: { ...ar, data: arData } }, 
      tr: { translation: { ...tr, data: trData } }, 
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;