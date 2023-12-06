module.exports = {
  i18n: {
    defaultLocale: "fr",
    locales: ["fr"],
  },
  fallbackLng: {
    default: ["fr"],
  },
  interpolation: {
    escapeValue: false,
  },
  serializeConfig: false,
  localePath: (locale, namespace) => {
    switch (namespace) {
      case "validations":
        return `./src/services/validations/i18n/${locale}.json`;
      default:
        return `./src/services/validations/i18n/${locale}.json`;
    }
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
  ns: ["validations"],
};
