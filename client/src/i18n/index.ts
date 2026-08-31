import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enNav from "./locales/en/nav.json";
import enFooter from "./locales/en/footer.json";
import enHero from "./locales/en/hero.json";
import enHome from "./locales/en/home.json";
import enPages from "./locales/en/pages.json";
import enAuth from "./locales/en/auth.json";
import enBooking from "./locales/en/booking.json";
import enProvider from "./locales/en/provider.json";
import enAdmin from "./locales/en/admin.json";
import enCompliance from "./locales/en/compliance.json";
import enGateway from "./locales/en/gateway.json";
import enEmergency from "./locales/en/emergency.json";

import arCommon from "./locales/ar/common.json";
import arNav from "./locales/ar/nav.json";
import arFooter from "./locales/ar/footer.json";
import arHero from "./locales/ar/hero.json";
import arHome from "./locales/ar/home.json";
import arPages from "./locales/ar/pages.json";
import arAuth from "./locales/ar/auth.json";
import arBooking from "./locales/ar/booking.json";
import arProvider from "./locales/ar/provider.json";
import arAdmin from "./locales/ar/admin.json";
import arCompliance from "./locales/ar/compliance.json";
import arGateway from "./locales/ar/gateway.json";
import arEmergency from "./locales/ar/emergency.json";

export const NAMESPACES = [
  "common",
  "nav",
  "footer",
  "hero",
  "home",
  "pages",
  "auth",
  "booking",
  "provider",
  "admin",
  "compliance",
  "gateway",
  "emergency",
] as const;

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      nav: enNav,
      footer: enFooter,
      hero: enHero,
      home: enHome,
      pages: enPages,
      auth: enAuth,
      booking: enBooking,
      provider: enProvider,
      admin: enAdmin,
      compliance: enCompliance,
      gateway: enGateway,
      emergency: enEmergency,
    },
    ar: {
      common: arCommon,
      nav: arNav,
      footer: arFooter,
      hero: arHero,
      home: arHome,
      pages: arPages,
      auth: arAuth,
      booking: arBooking,
      provider: arProvider,
      admin: arAdmin,
      compliance: arCompliance,
      gateway: arGateway,
      emergency: arEmergency,
    },
  },
  lng: localStorage.getItem("hc360_lang") || "en",
  fallbackLng: "en",
  ns: NAMESPACES,
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;
