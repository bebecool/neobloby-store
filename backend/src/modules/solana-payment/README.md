# Solana Payment Provider

Ce projet utilise [medusa-payment-solana](https://www.npmjs.com/package/medusa-payment-solana) pour accepter les paiements en cryptomonnaie Solana (SOL).

## Configuration requise

### Variables d'environnement

Ajoutez les variables suivantes à votre fichier `.env` :

```bash
# Solana Payment Provider
SOLANA_MNEMONIC="your 12 or 24-word mnemonic phrase"
SOLANA_COLD_STORAGE_WALLET="your solana cold storage wallet address"
SOLANA_RPC_URL="https://api.mainnet-beta.solana.com"  # ou https://api.devnet.solana.com pour le testnet
SOLANA_SESSION_EXPIRATION=600  # Durée de validité de la session de paiement en secondes (10 minutes par défaut)

# Optionnel : Conversion de devise en temps réel via CoinGecko
COINGECKO_API_KEY="your coingecko api key"
```

### Générer une phrase mnémonique

Pour générer une nouvelle phrase mnémonique sécurisée :

```bash
node src/scripts/generate-solana-mnemonic.js
```

⚠️ **IMPORTANT** : Ne partagez jamais votre phrase mnémonique avec quiconque et ne la commitez pas dans votre dépôt Git !

## Activation dans Medusa Admin

1. Connectez-vous à l'admin Medusa (par défaut sur `http://localhost:9000/app`)
2. Allez dans **Settings** > **Regions**
3. Sélectionnez la région où vous souhaitez activer les paiements Solana
4. Dans la section **Payment Providers**, cochez la case **solana**
5. Enregistrez les modifications

## Conversion de devise

Le module supporte deux options de conversion de devise :

### 1. Taux fixes (par défaut)
- 1 USD = 0.0075 SOL
- 1 EUR = 0.008 SOL

### 2. Taux en temps réel via CoinGecko
Pour utiliser les taux en temps réel, configurez `COINGECKO_API_KEY` dans votre `.env`.

## Fonctionnement

1. **Initiation** : Quand un client sélectionne Solana, une session de paiement est créée avec un montant en SOL calculé et une date d'expiration
2. **Surveillance** : Un job planifié vérifie périodiquement les paiements (toutes les minutes)
3. **Vérification** : Le système vérifie si le paiement complet a été reçu avant l'expiration
4. **Capture & Transfert** : Une fois autorisé, le paiement est capturé, la commande est créée et les fonds sont automatiquement transférés vers votre portefeuille de stockage à froid

## Job de vérification des paiements

Le job `check-solana-payments` s'exécute automatiquement toutes les minutes pour surveiller et traiter les paiements Solana.

Fichier : `src/jobs/check-solana-payments.ts`

## Ressources

- [Documentation officielle](https://www.npmjs.com/package/medusa-payment-solana)
- [Guide de déploiement](https://funkyton.com/medusa-payment-solana-preview/)
- [Référence Solana RPC](https://solana.com/docs/references/clusters)

## Sécurité

⚠️ Ce module est fourni en version bêta. Testez toujours sur le testnet Solana avant d'utiliser des fonds réels !

- Utilisez `https://api.devnet.solana.com` pour les tests
- Utilisez `https://api.mainnet-beta.solana.com` pour la production

## Support

Pour toute question ou problème, consultez :
- [GitHub Issues](https://github.com/rpuls/medusa-payment-solana/issues)
- [Project Board](https://github.com/users/rpuls/projects/2)
