# 🚀 eRankUp Deployment Guide (Free Tier)

This guide will help you deploy the eRankUp application to the web for free using **Render (Backend)**, **Vercel (Frontend)**, **Supabase (Database)**, and **Upstash (Redis)**.

---

## 🏗️ Preparation

### 1. Database (Supabase - FREE)
1.  Go to [Supabase](https://supabase.com/) and create a free project.
2.  Go to **Project Settings > Database**.
3.  Copy the **Connection String** (URI). It looks like: `postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres`
4.  **Important**: In Render, you will use these details individually (Host, Port, User, Password, DB Name).

### 2. Redis (Upstash - FREE)
1.  Go to [Upstash](https://upstash.com/) and create a free Redis database.
2.  Note down the **Endpoint** (Host), **Port**, and **Password**.
3.  Enable **TLS/SSL** (usually default on Upstash).

### 3. AI (Google Gemini - FREE)
1.  Go to [Google AI Studio](https://aistudio.google.com/).
2.  Generate a free **API Key**.

---

## 🖥️ Backend Deployment (Render)

1.  Connect your GitHub repository to [Render](https://render.com/).
2.  Create a new **Web Service**.
3.  **Root Directory**: (Leave blank - use the Repo Root)
4.  **Runtime**: `Node`
5.  **Build Command**: `npm install && npm run build --prefix backend`
6.  **Start Command**: `node backend/dist/main` 
    *(Note: Check your local `dist` folder after building. If it is `dist/src/main`, use that instead.)*
7.  **Environment Variables**: ... (same as before)

---

## 🎨 Frontend Deployment (Vercel)

1.  Import your GitHub repository to [Vercel](https://vercel.com/).
2.  **Project Name**: `erankup-frontend`
3.  **Root Directory**: (Leave blank - use Repo Root)
4.  **Framework Preset**: `Next.js`
5.  **Build Command**: `npm install && npm run build --prefix frontend`
6.  **Output Directory**: `frontend/.next`
7.  **Environment Variables**:
    *   `NEXT_PUBLIC_BACKEND_URL`: `https://your-backend-render-url.onrender.com` (Your Render URL)

---

## ✅ Post-Deployment Check
1.  Once Render provides a URL, update the `ALLOWED_ORIGINS` in your Render environment variables to include it.
2.  The "AI Engine" logic is already included in your backend code, so no extra service is needed for AI!
3.  Visit your Vercel URL and try creating an account or submitting a test to verify everything works.

---
**Need Help?** If you run into errors during the build process, share the logs with me!
