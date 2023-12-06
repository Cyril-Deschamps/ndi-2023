import "react-i18next";

import validations from "../validations/i18n/fr.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "validations";
    resources: {
      validations: typeof validations;
    };
  }
}
