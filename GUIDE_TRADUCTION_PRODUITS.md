# Guide de Traduction des Produits

## Comment traduire vos produits dans toutes les langues

Ce système utilise les **métadonnées** de Medusa pour stocker les traductions de vos produits.

### 📝 Langues supportées

- `fr` - Français (langue par défaut, utilisez les champs standards)
- `en` - Anglais
- `de` - Allemand
- `es` - Espagnol
- `it` - Italien
- `nl` - Néerlandais

---

## 🎯 Ajouter des traductions via l'Admin Medusa

### 1. Créer/Modifier un produit

1. Connectez-vous à l'admin Medusa
2. Allez dans **Produits**
3. Créez ou modifiez un produit existant
4. Remplissez le **Titre** et la **Description** en **français** (ce sont les valeurs par défaut)

### 2. Ajouter les métadonnées de traduction

Dans la section **Métadonnées** (Metadata) du produit, ajoutez les clés suivantes :

#### Pour le titre :

```
title_en: My Product Title
title_de: Mein Produkttitel
title_es: Mi Título de Producto
title_it: Il Mio Titolo del Prodotto
title_nl: Mijn Producttitel
```

#### Pour la description :

```
description_en: Product description in English...
description_de: Produktbeschreibung auf Deutsch...
description_es: Descripción del producto en español...
description_it: Descrizione del prodotto in italiano...
description_nl: Productbeschrijving in het Nederlands...
```

### 3. Exemple complet pour un produit "NeoBloby Kit Pro"

**Champs standards (français) :**
- **Titre :** NeoBloby Kit Pro
- **Description :** Le kit complet pour élever votre Blob...

**Métadonnées :**
```json
{
  "title_en": "NeoBloby Kit Pro",
  "title_de": "NeoBloby Kit Pro",
  "title_es": "NeoBloby Kit Pro",
  "title_it": "NeoBloby Kit Pro",
  "title_nl": "NeoBloby Kit Pro",
  
  "description_en": "The complete kit to raise your Blob...",
  "description_de": "Das komplette Set zur Aufzucht Ihres Blobs...",
  "description_es": "El kit completo para criar tu Blob...",
  "description_it": "Il kit completo per allevare il tuo Blob...",
  "description_nl": "De complete kit om je Blob te kweken..."
}
```

---

## 🔧 Comment ça fonctionne ?

1. **Langue française** : Affiche directement le titre et la description du produit
2. **Autres langues** : Cherche d'abord `title_XX` et `description_XX` dans les métadonnées
3. **Fallback** : Si la traduction n'existe pas, affiche le français par défaut

---

## 📦 Traduction des Collections

Le même système fonctionne pour les collections :

**Métadonnées de collection :**
```json
{
  "title_en": "Collection Name",
  "title_de": "Sammlungsname",
  "title_es": "Nombre de la Colección",
  "title_it": "Nome della Collezione",
  "title_nl": "Collectienaam"
}
```

---

## ✅ Avantages de cette méthode

- ✅ **Simple** : Tout se gère dans l'admin Medusa
- ✅ **Flexible** : Ajoutez les traductions au fur et à mesure
- ✅ **Pas de code** : Aucune modification de code nécessaire
- ✅ **Fallback automatique** : Le français s'affiche si la traduction manque
- ✅ **SEO friendly** : Chaque langue a son propre contenu

---

## 🚀 Conseils pratiques

1. **Commencez par l'anglais** : C'est la langue internationale la plus importante
2. **Utilisez des outils de traduction** : DeepL ou ChatGPT peuvent vous aider
3. **Cohérence** : Gardez le même ton et style dans toutes les langues
4. **Testez** : Vérifiez chaque langue sur le site
5. **Produits importants d'abord** : Traduisez d'abord vos best-sellers

---

## 🔍 Vérification

Pour tester si vos traductions fonctionnent :

1. Changez la langue sur le site (sélecteur en haut à droite)
2. Naviguez vers un produit
3. Vérifiez que le titre et la description s'affichent dans la bonne langue

Si la traduction n'apparaît pas :
- Vérifiez l'orthographe des clés (ex: `title_en` et non `titre_en`)
- Assurez-vous que les métadonnées sont bien sauvegardées
- Rafraîchissez le cache du navigateur (Ctrl+Shift+R)

---

## 📞 Support

Si vous avez des questions ou des problèmes, consultez la documentation Medusa sur les métadonnées :
https://docs.medusajs.com/
