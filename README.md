# Bhairavnath Interior Works

A premium, high-performance website for **Bhairavnath Interior Works** featuring smooth scroll-driven room assembly animations, direct Cloudinary media synchronization, and a serverless PostgreSQL backend.

---

## 🛠️ Tech Stack & Features

*   **Frontend**: React, Vite, Vanilla CSS (quiet luxury color system, frosted glassmorphism elements, responsive mobile layouts).
*   **Scroll Animation**: Canvas-based frame layout that morphs rooms (Living Room, Modular Kitchen, Bedroom Wardrobes) seamlessly on scroll.
*   **Database**: Neon PostgreSQL database integration for reviews, contact submissions, and journals.
*   **Serverless Backend**: Vercel Serverless Functions (`/api/*`) for forms, blog management, signatures, and testimonials.
*   **Image Management**: Cloudinary integration for portfolio media & recognition certificates with client-side signed uploads.

---

## 🚀 Getting Started

### 1. Installation
Install the project dependencies locally:
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file at the root of the project:
```env
DATABASE_URL="your_neon_postgres_connection_string"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

VITE_CLOUDINARY_CLOUD_NAME="your_cloud_name"
VITE_CLOUDINARY_API_KEY="your_api_key"
```

---

## 📦 Scripts & Commands

### Local Development
Runs the Vite development server:
```bash
npm run dev
```

### Build Production Assets
Compiles and bundles frontend code into the `dist/` directory:
```bash
npm run build
```

### Initialize Database
Creates the Neon PostgreSQL database tables (`testimonials`, `journals`, `contact_submissions`) and seeds initial blog posts:
```bash
node scripts/init-db.js
```

### Sync Images from Cloudinary
Downloads metadata of uploaded folders from Cloudinary to update portfolio grids and about ceremony photos:
```bash
npm run sync-images
```

---

## ☁️ Vercel Deployment

1.  Create a new project on **Vercel** and link this repository.
2.  Add your environment variables in the Vercel Dashboard under **Project Settings > Environment Variables**.
3.  Vercel will build the project automatically and deploy the `/api/*` endpoints as serverless functions.
