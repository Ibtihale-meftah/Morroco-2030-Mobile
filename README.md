# Morocco 2030 Guide

Application mobile développée avec React Native et Expo pour accompagner les visiteurs pendant la Coupe du Monde 2030 au Maroc.

## Objectif du projet

Fournir une application mobile simple et intuitive permettant aux touristes et aux utilisateurs locaux de :

- Découvrir les villes hôtes
- Explorer les monuments et lieux touristiques
- Consulter des itinéraires
- Utiliser une carte interactive
- Accéder à des services pratiques liés à l’événement

## Fonctionnalités principales

- Navigation fluide avec Expo Router
- Écrans organisés par services
- Design responsive adapté au mobile
- Architecture claire et maintenable
- Prêt pour l’ajout du multilingue et du RTL si nécessaire

## Technologies utilisées

- React Native
- Expo
- Expo Router
- TypeScript
- JavaScript
- StyleSheet React Native

## Structure du projet

MOROCCO-2030-MOBILE
│
├── app
│ ├── itinerary
│ ├── monuments
│ ├── map
│ ├── index.tsx
│ ├── _layout.tsx
│
├── src
│ ├── components
│ ├── context
│
├── assets
├── constants
├── data
├── hooks
├── package.json
└── README.md


## Installation et exécution

1. Cloner le projet

git clone https://github.com/username/morocco-2030-mobile.git 


2. Accéder au dossier du projet

cd morocco-2030-mobile



3. Installer les dépendances

npm install
npx expo install expo-print
npx expo install expo-sharing
npm install react-native-qrcode-svg
npm install react-native-svg


4. Lancer l’application

npx expo start



Scanner le QR code avec l’application Expo Go ou lancer sur un émulateur.

## Écrans disponibles

- Accueil des services
- Villes hôtes
- Itinéraires touristiques
- Carte interactive
- Fan ID
- eVisa / AEVM

## État du projet

Projet en cours de développement.  
Des améliorations sont prévues, notamment :

- Ajout du multilingue
- Amélioration de l’UX/UI
- Intégration de données dynamiques
- Gestion hors ligne partielle

## Auteur

Développé par Ibtihale Meftah, Kawtar Gouy, Amine Errada, Adam Labrahmi  
Projet académique et applicatif autour de MoroccoGo 2030

## Licence

Ce projet est à usage éducatif et démonstratif.

