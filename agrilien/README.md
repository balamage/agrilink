# AgriLien — site Next.js

Site vitrine responsive du projet AgriLien, conçu à partir du TP AgriLien et du guide SEO Next.js.

## Fonctionnalités du prototype
- Présentation du projet AgriLien et de sa proposition de valeur.
- Catalogue de récoltes avec recherche, filtre par zone et tri par prix.
- Formulaire de publication d'une annonce.
- Affichage à la demande du numéro du vendeur.
- Prix indicatifs de Goma repris du TP.
- Métadonnées SEO, URL canonique, sitemap.xml et robots.txt.
- Mise en page adaptée aux téléphones.

## Important
La V1 fournie est un prototype front-end : les annonces créées sont enregistrées dans le navigateur (localStorage) de l'appareil. Elles ne sont donc pas partagées avec les autres visiteurs. Les annonces initiales sont des exemples. Les SMS/USSD, comptes, modération réelle, notifications et base de données nécessitent un serveur/API et une intégration ultérieure.

Les photographies de produits sont chargées depuis Unsplash et nécessitent une connexion Internet.

## Déploiement GitHub + Vercel depuis un téléphone
1. Téléchargez et décompressez le ZIP.
2. Dans GitHub, créez un dépôt public ou privé vide nommé `agrilien-site`.
3. Sur le téléphone, ouvrez le dépôt GitHub dans Chrome, choisissez **Add file > Upload files** et téléversez le contenu du dossier décompressé (les dossiers `app` et `public` doivent rester à la racine).
4. Validez avec **Commit changes**.
5. Ouvrez Vercel et connectez-vous avec GitHub.
6. Choisissez **Add New > Project**, importez `agrilien-site`, gardez les réglages Next.js par défaut puis cliquez **Deploy**.
7. Après publication, copiez le domaine Vercel, par exemple `https://agrilien-site.vercel.app`.
8. Pour le SEO, mettez cette adresse dans `NEXT_PUBLIC_SITE_URL` dans les variables d'environnement Vercel, ou remplacez le domaine de démonstration dans `app/layout.tsx`, `app/sitemap.ts` et `app/robots.ts`, puis poussez les changements sur GitHub.

## SEO du TP
Après le déploiement :
- Ouvrir `/sitemap.xml` et `/robots.txt` sur le domaine Vercel.
- Ajouter le site comme propriété « Préfixe d'URL » dans Google Search Console.
- Soumettre `sitemap.xml`.
- Créer une propriété GA4 et renseigner `NEXT_PUBLIC_GA_ID` si le suivi Analytics est demandé.
- Tester le site avec PageSpeed Insights, en mode mobile puis ordinateur.

Ne publiez jamais de mot de passe, jeton privé ou fichier `.env` contenant des secrets sur GitHub.
