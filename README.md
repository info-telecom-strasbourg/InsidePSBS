# InsidePSBS

## Structure de fichiers

- ``/app`` : la structure de l'application suivant le modèle de Expo Router
- ``/screens :`` les différents écrans de l'application correspondant aux routes crées
- ``/components :`` tous les composants utilisés à plusieurs endroits (boutons, forumlaire, etc...)
- ``/hooks :`` les hooks personnalisés
- ``/contexts :`` les hooks personnalisés
- ``/utils :`` les fonctions utilitaires
- ``/assets :`` toutes les ressources nécessaires (images, icones, polices, etc...)
- ``/constants :`` les constantes utiles (couleurs, textes, routes, polices importées)
- ``/style :`` le style global de l'application

Pour faire des tests, on peut utiliser le fichier ``/app/test.jsx`` et rediriger la route initiale dans ``/app/index.jsx`` vers ``ROUTES.test``

Le style propre à un composant est enregistré dans``<nom-du-composant>.style.js`` (cf le dossier ``/components``)

De même, pour créer un composant propre à un écran, on le place dans le dossier ``<nom-de-l'écran>``

Pour chaque dossier (sauf ``/app``), on crée un fichier ``index.js`` qui permet d'exporter tous les fichiers du dossier (cf le dossier ``/components``)

## Installation

- Installer Node.js
- Installer Expo CLI : ``npm install -g expo-cli``
- Cloner le projet : ``git clone git@github.com:info-telecom-strasbourg/AppTPS.gitgit@github.com:info-telecom-strasbourg/AppTPS.git``
- Installer les dépendances : ``npm install``
- Lancer le projet : ``npm start``
- Scanner le QR code avec l'application Expo Go (il faut être connecté sur le même réseau)

[lien-vers-le-todo](/tout-doux.md)