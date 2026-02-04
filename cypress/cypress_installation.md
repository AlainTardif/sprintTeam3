# Guide d'installation Cypress — Team 3

## Prérequis

- Node.js installé
- Le projet `sprintTeam3` cloné et à jour sur `main`
- **json-server** et **Live Server** doivent tourner

---

## Étape 1 — Se mettre à jour

```bash
git checkout main
git pull origin main
```

---

## Étape 2 — Installer les dépendances

```bash
npm install
```

> Cypress est déjà dans le `package.json`, cette commande l'installe automatiquement.

---

## Étape 3 — Lancer les serveurs (2 terminaux)

**Terminal 1 — API json-server :**

```bash
npx json-server datas/db.json --port 3000
```

**Terminal 2 — Live Server :**

Clic droit sur `index.html` dans VS Code → "Open with Live Server"

> L'application doit être accessible sur `http://localhost:5500`

---

## Étape 4 — Lancer Cypress

**Mode visuel (recommandé) :**

```bash
npx cypress open
```

1. Cliquer sur **"E2E Testing"**
2. Choisir **Chrome** ou **Edge**
3. Cliquer sur **"Start E2E Testing"**
4. Cliquer sur **products.cy.js** pour lancer les tests

**Mode terminal (sans interface) :**

```bash
npx cypress run
```

---

## Résolution de problèmes

### Erreur `EADDRINUSE` (port 3000 déjà utilisé)

```bash
npx kill-port 3000
npx json-server datas/db.json --port 3000
```

### Erreur `ERR_CONNECTION_REFUSED`

→ json-server ne tourne pas. Lancez-le dans un terminal.

### Erreur `CORS policy` ou `file:///`

→ Vous n'utilisez pas Live Server. Ouvrez `index.html` via Live Server (clic droit dans VS Code), pas en double-cliquant le fichier.

### Erreur `Could not find Cypress configuration`

```bash
npx cypress open
```

→ Cypress va générer la config automatiquement.