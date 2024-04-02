import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { languageService } from "@services/index";

import assistantEn from "./en/assistant.json";
import companyEn from "./en/company.json";

const currentLanguage = languageService.getPageLanguage();

export const resources = {
  en: {
    company: companyEn,
    assistant: assistantEn,
  },
};

i18n
  .use(initReactI18next)
  .init({
    lng: currentLanguage,
    ns: ["assistant", "company"],
    interpolation: {
      escapeValue: false,
    },
    resources,
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
