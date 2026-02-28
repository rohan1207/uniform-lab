# Deploy React Frontend on Render

## How the frontend uses the backend

The app talks to your backend using **`VITE_BACKEND_URL`**. Every API call uses:

```js
const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
fetch(`${API_BASE}/api/public/schools`);
```

- **Locally:** If `VITE_BACKEND_URL` is not in `.env`, it falls back to `http://localhost:5000`. So with no env var, the frontend already uses the backend on port 5000.
- **On Render:** You must set `VITE_BACKEND_URL` to your **deployed backend URL** (e.g. `https://uniformlabs-backend.onrender.com`).  
  **Important:** Vite bakes env vars into the build. So add `VITE_BACKEND_URL` in Render’s **Environment** tab for this frontend service; it will be used when the build runs.

---

## 1. Add backend URL locally (optional)

Copy the example file and set your backend URL:

```bash
cp .env.example .env
```

Edit `.env` and set:

- **Local:** `VITE_BACKEND_URL=http://localhost:5000` (or leave unset; code defaults to this)
- **Production:** use your live backend URL only in Render’s env (see below), not in the repo

---

## 2. Deploy the frontend on Render (Static Site)

1. **Push your code** to GitHub (or GitLab) so Render can use it.

2. **Create a new Static Site** on [Render](https://render.com):
   - Dashboard → **New** → **Static Site**
   - Connect the repo that contains `React-Frontend` (or the monorepo root; see step 4 if root).

3. **Configure the Static Site:**
   - **Name:** e.g. `uniformlabs-frontend`
   - **Branch:** `main` (or your default)
   - **Build command:**
     ```bash
     npm install && npm run build
     ```
   - **Publish directory:** `dist`  
     (If the repo root is the repo root and the app is in a subfolder, use e.g. `React-Frontend` for **Root Directory** and keep **Publish directory** as `dist` so it’s `React-Frontend/dist`.)

4. **If your repo root is the repo root** (e.g. `UniformLabs/` with `React-Frontend/` inside):
   - Set **Root Directory** to `React-Frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`

5. **Environment variables (required for API):**
   - Open **Environment** and add:
     - **Key:** `VITE_BACKEND_URL`
     - **Value:** `https://YOUR-BACKEND-URL.onrender.com` (no trailing slash)  
     Replace with your real Render backend URL (from the backend service you deploy separately).
   - Save. Render will use this when it runs the build, so the built app will call your deployed backend.

6. **Deploy:** Click **Create Static Site**. Render will build and host the frontend. After deploy, use the given URL (e.g. `https://uniformlabs-frontend.onrender.com`) to open the app.

---

## 3. Backend CORS

Your backend must allow requests from the Render frontend origin. In the backend (e.g. `Backend/src/app.js`), ensure CORS includes the Render URL:

```js
cors({
  origin: [
    'http://localhost:5173',           // local Vite dev
    'https://uniformlabs-frontend.onrender.com'  // your Render frontend URL
  ]
})
```

Or keep `origin: '*'` for public access (less secure but fine for many demos).

---

## 4. Checklist

- [ ] Repo connected to Render, Root Directory set if app is in a subfolder
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] `VITE_BACKEND_URL` set in Render Environment to your backend URL
- [ ] Backend deployed and CORS allows the frontend origin
- [ ] Redeploy frontend after any change to `VITE_BACKEND_URL` (env is baked in at build time)
