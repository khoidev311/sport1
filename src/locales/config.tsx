import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./en/en.json";

export const resources = {
  en: {
    translation: enTranslation,
  },
};

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources,
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
