# TP : Sécurisation d'une API REST avec Jetons JWT (BTS SIO)

Ce projet implémente une API REST sécurisée par jetons **JSON Web Token (JWT)** selon une architecture **Stateless** et un contrôle d'accès basé sur les rôles (**RBAC**).

---

## 🚀 1. Installation et Démarrage

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [Postman](https://www.postman.com/) pour exécuter les tests d'API

### Installation des dépendances
Clonez le dépôt puis installez les paquets nécessaires :
```bash
npm install
```

### Configuration des variables d'environnement
Créez un fichier `.env` à la racine (en vous basant sur `.env.example`) :
```env
PORT=3000
JWT_SECRET="votre_cle_secrete_ultra_robuste"
```

### Lancement du serveur
```bash
node server.js
```
Le serveur démarre sur : `http://localhost:3000`

---

## 📁 2. Architecture du Projet

```text
TP_JWT/
├── .env.example             # Modèle de variables d'environnement
├── .gitignore               # Fichiers exclus de Git (node_modules, .env)
├── package.json             # Dépendances et métadonnées du projet
├── server.js                # Point d'entrée de l'application
└── src/
    ├── data/
    │   └── users.js         # Données des utilisateurs de test
    ├── middlewares/
    │   └── auth.middleware.js # Middlewares de sécurité (verifyToken, requireRole)
    └── routes/
        ├── auth.routes.js   # Route publique POST /api/login
        ├── user.routes.js   # Route protégée GET  /api/me
        └── admin.routes.js  # Route protégée POST /api/admin
```

---

## 👥 3. Utilisateurs de Test

| Email | Mot de passe | Rôle | Droits d'accès |
|---|---|---|---|
| `tech1@geotech.fr` | `secure456` | `TECHNICIEN` | Accès à `/api/me` uniquement |
| `user1@geotech.fr` | `password123` | `MANAGER` | Accès à `/api/me` et `/api/admin` |

---

## 🛡️ 4. Routes de l'API

### A. Authentification (Publique)
- **`POST /api/login`**
  - **Body (JSON) :** `{ "email": "...", "password": "..." }`
  - **Réponse succès (200) :** `{ "token": "eyJhbGciOi..." }` (Valide 15 minutes)
  - **Réponse erreur (401) :** `{ "error": "Identifiants incorrects." }`

### B. Profil utilisateur (Protégée - Tous rôles)
- **`GET /api/me`**
  - **En-tête HTTP requis :** `Authorization: Bearer <TOKEN>`
  - **Réponse succès (200) :** Retourne le profil décodé `{ "id": 2, "email": "...", "role": "..." }`
  - **Réponse erreur (401) :** Jeton manquant, invalide ou expiré

### C. Espace Administration (Protégée - Rôle MANAGER uniquement)
- **`POST /api/admin`**
  - **En-tête HTTP requis :** `Authorization: Bearer <TOKEN>`
  - **Réponse succès (200) :** Si rôle `MANAGER`
  - **Réponse erreur (403) :** Si rôle `TECHNICIEN` (Accès interdit, droits insuffisants)

---

## 🧪 5. Validation des 5 Tests Postman

1. **Test 1 :** `GET /api/me` sans token ➔ **401 Unauthorized**
2. **Test 2 :** `POST /api/login` avec faux mot de passe ➔ **401 Unauthorized**
3. **Test 3 :** `POST /api/login` avec identifiants `tech1@geotech.fr` ➔ **200 OK** + réception du jeton JWT
4. **Test 4 :** `GET /api/me` avec `Bearer <TOKEN>` ➔ **200 OK** + profil affiché
5. **Test 5 :** `POST /api/admin` avec le token technicien ➔ **403 Forbidden** (Droits insuffisants)
