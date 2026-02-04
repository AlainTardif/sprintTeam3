# IA.md — Prompts ayant produit du code

Ce fichier liste les prompts envoyés à l'IA (Claude) qui ont directement généré du code utilisé dans le projet.

---

## 1. Modèle Product

**Prompt :** "On continue. Crée le fichier Product.js — le modèle de données avec les champs id, name, price, category, detail."

**Fichier généré :** `src/core/model/Product.js`

---

## 2. Composant ProductList

**Prompt :** "On continue avec ProductList.js (US1 — afficher la liste des produits)."

**Fichier généré :** `components/ProductList.js`

**Détail :** Composant qui récupère les produits via ProductService, génère les cards HTML et gère le tri par champ/ordre.

---

## 3. Composant ProductForm

**Prompt :** "On continue avec ProductForm.js pour gérer la modale ajout et modification."

**Fichier généré :** `components/ProductForm.js`

**Détail :** Composant qui gère l'ouverture/fermeture de la modale, le mode création ou édition, la validation des champs et l'envoi via ProductService.

---

## 4. Main.js — Orchestrateur

**Prompt :** "On continue. Main.js — le chef d'orchestre qui branche tout ensemble."

**Fichier généré :** `src/main.js`

**Détail :** Point d'entrée de l'application. Instancie ProductList et ProductForm, branche tous les événements DOM (boutons, tri, modale, formulaire, suppression).

---

## 5. Structure HTML

**Prompt :** "D'abord le HTML. Crée la page index.html avec header, grille produits, modale formulaire et conteneur toasts."

**Fichier généré :** `index.html`

---

## 6. Données initiales

**Prompt :** "Adapte le db.json au modèle Product avec des données de test."

**Fichier généré :** `datas/db.json`

---

## 7. CSS

**Prompt :** "Crée le CSS complet avec variables, responsive, styles modale et toasts."

**Fichier généré :** `css/style.css`