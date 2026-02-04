# Gestionnaire de Produits

Application web de gestion de produits (CRUD) développée en JavaScript vanilla avec une architecture MVC.

## Équipe Michel - Aurélien - Anthony - Alain

**Team 3** - Sprint Agile AELION

## Fonctionnalités

- **Affichage** : Liste des produits en cards avec tri par nom, prix ou catégorie (US1)
- **Ajout** : Formulaire de création de produit via modale (US2)
- **Modification** : Formulaire de mise à jour pré-rempli via modale (US3)
- **Suppression** : Suppression avec dialogue de confirmation (US4)
- **Modale** : Popup avec backdrop pour les formulaires (US5)
- **Notifications** : Système de toasts pour les retours utilisateur (US6)

## Prérequis

- Node.js
- npm

## Installation

```bash
git clone https://github.com/AlainTardif/sprintTeam3.git
cd sprintTeam3
npm install
```

## Lancement

**1. Démarrer l'API (json-server sur le port 3000) :**

```bash
npm run api:start
```

**2. Ouvrir l'application :**

Ouvrir `index.html` avec Live Server (VS Code) sur `http://localhost:5500`.

> Les deux serveurs doivent tourner en parallèle.

## Architecture

```
sprintTeam3/
├── components/
│   ├── ProductList.js       # Composant liste (affichage, tri)
│   └── ProductForm.js       # Composant formulaire (ajout, modification)
├── css/
│   └── style.css            # Styles avec variables CSS et responsive
├── datas/
│   └── db.json              # Base de données JSON (json-server)
├── src/
│   ├── core/
│   │   ├── http/
│   │   │   └── http-client.js    # Client HTTP générique (GET, POST, PUT, DELETE)
│   │   ├── model/
│   │   │   └── Product.js        # Modèle produit
│   │   └── services/
│   │       └── product-service.js # Service CRUD produits
│   └── main.js              # Point d'entrée, orchestrateur de l'application
├── tests/
├── index.html               # Page principale
├── package.json
├── README.md
└── IA.md
```

## Stack technique

- **Frontend** : HTML5, CSS3, JavaScript ES Modules
- **API** : json-server
- **Architecture** : MVC (Model-View-Controller)
- **Tests** : Cypress (e2e)

## Modèle de données (Product)

| Champ    | Type   | Description          |
|----------|--------|----------------------|
| id       | number | Identifiant unique   |
| name     | string | Nom du produit       |
| price    | number | Prix en euros        |
| category | string | Catégorie            |
| detail   | string | Description produit  |

## Workflow Git

- Branche principale : `main`
- Branche de développement : `stream3`
- Historique linéaire avec `git rebase` (pas de merge)