'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Traductions intégrées pour éviter les appels réseau
const resources = {
  fr: {
    common: {
      'hero.title': 'Bienvenue sur NeoBloby',
      'hero.subtitle': 'Votre boutique en ligne moderne',
      'hero.cta': 'Découvrir nos produits',
      'nav.language': 'Langue',
      'nav.account': 'Mon Compte',
      'nav.cart': 'Panier',
      'nav.shop': 'Boutique',
      'nav.about': 'À propos',
      'nav.home': 'Accueil',
      'nav.search': 'Recherche',
      'cart.title': 'Panier',
      'page.cart.title': 'Panier',
      'cart.myCart': 'Mon Panier',
      'cart.viewCart': 'Voir le panier',
      'cart.empty': 'Panier vide',
      'cart.emptyDesc': 'Ajoutez des produits pour commencer vos achats',
      'cart.total': 'Total',
      'cart.checkout': 'Procéder au paiement',
      'cart.secure': 'Paiement sécurisé',
      'cart.freeShipping': 'Livraison gratuite dès 50€',
      'cart.close': 'Fermer',
      'cart.remove': 'Supprimer',
      'cart.unit': 'unité',
      'cart.subtotal': 'Sous-total (excl. livraison et taxes)',
      'cart.shipping': 'Livraison',
      'cart.taxes': 'Taxes',
      'cart.gotoCheckout': 'Procéder au paiement',
      'shipping.to': 'Livraison vers :',
      'sort.by': 'Trier par',
      'sort.latest': 'Dernières nouveautés',
      'sort.priceAsc': 'Prix croissant',
      'sort.priceDesc': 'Prix décroissant',
      'sort.nameAsc': 'Nom A-Z',
      'sort.nameDesc': 'Nom Z-A',
      'search.placeholder': 'Rechercher...',
      'search.noResults': 'Aucun résultat trouvé',
      'product.addToCart': 'Ajouter au panier',
      'product.selectVariant': 'Sélectionner variante',
      'product.viewDetails': 'Voir les détails',
      'product.outOfStock': 'Rupture de stock',
      'assistant.title': 'Assistant IA',
      'assistant.close': 'Fermer',
      'assistant.placeholder': 'Ta question...',
      'assistant.send': 'Envoyer',
      'assistant.welcome': 'Bonjour 👋 Pose-moi une question sur nos produits.',
      'assistant.response': 'Bonjour ! Je suis l\'assistant NeoBloby. Je peux vous aider avec nos produits. Que cherchez-vous ?',
      'page.cart': 'Panier',
      'cart.item': 'Article',
      'cart.quantity': 'Quantité',
      'cart.price': 'Prix',
      'cart.variant': 'Variante :',
      'account.alreadyHave': 'Vous avez déjà un compte ?',
      'account.signIn': 'Se connecter',
      'account.signInBetter': 'Connectez-vous pour une meilleure expérience.',
      'account.alreadyHaveAccount': 'Vous avez déjà un compte ?',
      'account.signInForBetter': 'Connectez-vous pour une meilleure expérience.',
      'summary.title': 'Résumé',
      'summary.goToCheckout': 'Procéder au paiement',
      'summary.addPromo': 'Ajouter un code promo',
      'summary.subtotal': 'Sous-total (excl. livraison et taxes)',
      'summary.shipping': 'Livraison',
      'summary.taxes': 'Taxes',
      'summary.total': 'Total',
      'summary.checkout': 'Procéder au paiement'
    }
  },
  en: {
    common: {
      'hero.title': 'Welcome to NeoBloby',
      'hero.subtitle': 'Your modern online store',
      'hero.cta': 'Discover our products',
      'nav.language': 'Language',
      'nav.account': 'My Account',
      'nav.cart': 'Cart',
      'nav.shop': 'Shop',
      'nav.about': 'About',
      'nav.home': 'Home',
      'nav.search': 'Search',
      'cart.title': 'Cart',
      'page.cart.title': 'Cart',
      'cart.myCart': 'My Cart',
      'cart.viewCart': 'View cart',
      'cart.empty': 'Empty cart',
      'cart.emptyDesc': 'Add products to start shopping',
      'cart.total': 'Total',
      'cart.checkout': 'Proceed to checkout',
      'cart.secure': 'Secure payment',
      'cart.freeShipping': 'Free shipping from €50',
      'cart.close': 'Close',
      'cart.remove': 'Remove',
      'cart.unit': 'unit',
      'shipping.to': 'Shipping to:',
      'sort.by': 'Sort by',
      'sort.latest': 'Latest Arrivals',
      'sort.priceAsc': 'Price ascending',
      'sort.priceDesc': 'Price descending',
      'sort.nameAsc': 'Name A-Z',
      'sort.nameDesc': 'Name Z-A',
      'search.placeholder': 'Search...',
      'search.noResults': 'No results found',
      'product.addToCart': 'Add to cart',
      'product.selectVariant': 'Select variant',
      'product.viewDetails': 'View details',
      'product.outOfStock': 'Out of stock',
      'assistant.title': 'AI Assistant',
      'assistant.close': 'Close',
      'assistant.placeholder': 'Your question...',
      'assistant.send': 'Send',
      'assistant.welcome': 'Hello 👋 Ask me a question about our products.',
      'assistant.response': 'Hello! I\'m the NeoBloby assistant. I can help you with our products. What are you looking for?',
      'page.cart': 'Cart',
      'cart.item': 'Item',
      'cart.quantity': 'Quantity',
      'cart.price': 'Price',
      'cart.variant': 'Variant:',
      'account.alreadyHave': 'Already have an account?',
      'account.signIn': 'Sign in',
      'account.signInBetter': 'Sign in for a better experience.',
      'account.alreadyHaveAccount': 'Already have an account?',
      'account.signInForBetter': 'Sign in for a better experience.',
      'summary.title': 'Summary',
      'summary.goToCheckout': 'Go to checkout',
      'summary.addPromo': 'Add Promotion Code(s)',
      'summary.subtotal': 'Subtotal (excl. shipping and taxes)',
      'summary.shipping': 'Shipping',
      'summary.taxes': 'Taxes',
      'summary.total': 'Total',
      'summary.checkout': 'Go to checkout'
    }
  }
}

// Configuration i18n côté client uniquement
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    lng: 'fr', // Forcer la langue par défaut
    defaultNS: 'common',
    debug: false,
    
    interpolation: {
      escapeValue: false, // React échappe déjà les valeurs
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    react: {
      useSuspense: false, // Important pour Next.js App Router
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: false,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i']
    }
  })

export default i18n
