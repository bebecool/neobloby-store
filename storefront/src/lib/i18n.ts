import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import des traductions directement (sans fichiers JSON pour éviter les problèmes de build)
const resources = {
  fr: {
    translation: {
      "hero_title": "Kits & sclérotes de blob",
      "hero_subtitle": "Des blobo (Physarum polycephalum) pour vos expériences scientifiques !",
      "hero_button": "Acheter",
      "nav_home": "Accueil",
      "nav_store": "Boutique",
      "nav_search": "Recherche",
      "nav_account": "Compte",
      "nav_cart": "Panier"
    }
  },
  en: {
    translation: {
      "hero_title": "Blob kits & sclerotia",
      "hero_subtitle": "Blobs (Physarum polycephalum) for your scientific experiments!",
      "hero_button": "Buy",
      "nav_home": "Home",
      "nav_store": "Store",
      "nav_search": "Search",
      "nav_account": "Account",
      "nav_cart": "Cart"
    }
  }
};

// Configuration i18n côté client uniquement
if (typeof window !== "undefined") {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: "fr", // langue par défaut
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
