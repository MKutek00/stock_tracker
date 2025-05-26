import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: "pl",
  fallbackLocale: "en",
  messages: {
    en: {},
    pl: {},
  },
});

export function setLocale(locale: "pl" | "en") {
  i18n.global.locale.value = locale;
}

export default i18n;
