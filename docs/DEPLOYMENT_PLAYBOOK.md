# 🚀 THE SOVEREIGN DEPLOYMENT PLAYBOOK
**CONTEXT:** Scaling the MentalOS Manifold to the Global Realm

This playbook defines the deterministic path for deploying your pristine monorepo structure to Vercel and Fly.io.

---

## ☁️ 1. FRONTEND: THE GLASS VESSEL (VERCEL)
**Target:** `apps/web`

### Prerequisites
- Install Vercel CLI: `npm install -g vercel`

### Deployment Ritual
1.  **Initialize:** `vercel login`
2.  **Ignite:** `vercel link` (Select `apps/web` as the root)
3.  **Deploy (Preview):** `vercel`
4.  **Promote (Production):** `vercel --prod`

### Env Variables (Gevurah Vault)
Ensure the following are set in the Vercel Dashboard:
- `NEXT_PUBLIC_API_URL`: Your backend URL (e.g. `https://api.yourproject.com`)

---

## ⚡ 2. BACKEND: THE KINETIC HEART (FLY.IO)
**Target:** `services/api` & `services/engine`

### Prerequisites
- Install Fly CLI: `curl -L https://fly.io/install.sh | sh`

### Deployment Ritual
1.  **Initialize:** `fly launch` inside each service folder.
2.  **Harden:** Fly will detect the `Dockerfile` automatically.
3.  **Deploy:** `fly deploy`

### Scaling
`fly scale count 2` to ensure high-availability of the Orchestrator.

---

## 🐙 3. GIT SOVEREIGNTY (VERSION CONTROL)

- **Main Branch:** The Showroom. High-quality commits only.
- **Actions:** Use GitHub Actions for automated `Omega-Scan` (Testing) on every Push.
- **Cleanliness:** Use `.gitignore` to keep the environment debris out of the manifold.

---
