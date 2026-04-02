# 🌿 Nizom Nasullayev — Portfolio

A full-stack personal portfolio with a real-time admin panel, built with React + Vite + TypeScript and powered by Firebase.

## ⚡ Tech Stack

- **React 18 + Vite + TypeScript** — frontend
- **Firebase Firestore** — real-time project database
- **Firebase Auth** — email/password protected admin panel
- **Framer Motion** — all animations and transitions
- **Hover.css** — button background sweep effects
- **EmailJS** — contact form → Gmail (no backend needed)
- **Dark / Light mode** — persisted in localStorage

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── resume.pdf          # Your downloadable resume
│   └── og-image.png        # Open Graph image for link previews
├── src/
│   ├── components/
│   │   ├── Navbar.tsx      # Fixed navbar, active pill, mobile menu, theme toggle
│   │   ├── Hero.tsx        # Typewriter effect, social links, download resume button
│   │   ├── About.tsx       # About section with feature cards
│   │   ├── Skills.tsx      # Animated progress bars + infinite marquee
│   │   ├── Projects.tsx    # Real-time projects grid, featured + tag filters
│   │   ├── ProjectCard.tsx # Card with hover glow, tags, GitHub + live links
│   │   ├── Contact.tsx     # EmailJS contact form + social links
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── Portfolio.tsx   # Assembles all sections
│   │   └── admin/
│   │       ├── Login.tsx       # Firebase email/password login
│   │       ├── AdminPanel.tsx  # Full CRUD dashboard, real-time list
│   │       └── ProjectForm.tsx # Add / edit project form with tag input
│   ├── hooks/
│   │   ├── useProjects.ts  # Firestore real-time listener + add/update/delete
│   │   └── useAuth.ts      # Firebase Auth state + login/logout
│   ├── lib/
│   │   └── firebase.ts     # Firebase app initialisation
│   ├── types/
│   │   └── index.ts        # Shared TypeScript types (Project, Skill, Theme)
│   ├── App.tsx             # Router + ThemeContext + ProtectedRoute
│   ├── main.tsx
│   └── index.css           # CSS variables, dark/light tokens, utilities
├── index.html              # Open Graph + Twitter meta tags
├── firestore.rules         # Firestore security rules
├── .env.example            # Environment variable template
├── vite.config.ts
└── tsconfig.json
```

---

## 🚀 Setup

### 1. Clone & install

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in `.env` with your Firebase project values:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

> ⚠️ Never commit `.env` to Git — make sure it's in `.gitignore`

### 3. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com) and create a project
2. Enable **Firestore Database** → production mode
3. Enable **Authentication → Email/Password**
4. Add a Web App and copy the config into `.env`
5. In Firebase Auth → **Users** → **Add user** (your admin email + password)
6. Go to **Authentication → Settings → Authorized Domains** and add your Vercel domain after deploying

### 4. Set Firestore security rules

Paste into **Firebase Console → Firestore → Rules** tab and publish:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{projectId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

### 5. Set up EmailJS (contact form → Gmail)

1. Go to [emailjs.com](https://emailjs.com) and create a free account
2. **Email Services** → Add New Service → Gmail → connect your account → copy **Service ID**
3. **Email Templates** → Create New Template → set these fields:
   - **To Email:** your Gmail
   - **Reply To:** `{{from_email}}`
   - **Subject:** `New message from {{from_name}} — Portfolio`
   - **Body:** `Name: {{from_name}}\nEmail: {{from_email}}\n\n{{message}}`
   - Copy **Template ID**
4. **Account → General** → copy **Public Key**
5. Paste all 3 into `src/components/Contact.tsx`:

```ts
const EMAILJS_SERVICE_ID  = 'service_xxxxxxx'
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'
const EMAILJS_PUBLIC_KEY  = 'your_public_key'
```

### 6. Add your public files

```
public/
├── resume.pdf       # Export from rxresu.me as PDF
└── og-image.png     # 1200×630px image for link previews
```

### 7. Run locally

```bash
npm run dev
```

---

## 🔐 Admin Panel

- Visit `/admin/login`
- Sign in with the Firebase Auth user you created
- Add, edit, delete projects — updates appear on the portfolio **instantly**
- Unauthenticated users are automatically redirected to login

---

## 📦 Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo
3. Add all `VITE_*` environment variables from your `.env` file
4. Click **Deploy** — done ✅

Every `git push` to `main` triggers an automatic redeploy. No manual action needed.

After deploying, update the meta tag URLs in `index.html`:

```html
<meta property="og:url"   content="https://your-real-url.vercel.app/" />
<meta property="og:image" content="https://your-real-url.vercel.app/og-image.png" />
```

Test your link preview at [opengraph.xyz](https://opengraph.xyz).

---

## 🎨 Design Tokens

```css
/* Dark mode (default) */
--bg-0: #060d06           /* page background */
--green-bright: #4ade80   /* primary accent */
--green-mid: #22c55e      /* buttons, fills */
--text-primary: #f0fdf4
--text-muted: #4b7055
--border: rgba(74,222,128,0.12)
```

Fonts: **Syne** (display) + **DM Sans** (body) via Google Fonts.

---

## 🧩 Firestore Data Model

**Collection:** `projects`

```ts
{
  id:          string      // auto-generated
  title:       string
  description: string
  tags:        string[]    // ["React", "Firebase", ...]
  githubUrl:   string
  liveUrl?:    string
  imageUrl?:   string
  featured:    boolean
  createdAt:   Timestamp
}
```

---

## ✏️ Personalisation Checklist

| What | Where |
|---|---|
| Your name & bio | `Hero.tsx`, `About.tsx` |
| Profile photo | Replace `👤` in `Hero.tsx` / `About.tsx` with `<img src="/photo.jpg" />` |
| Social links | `Hero.tsx` → `SOCIALS` array, `Contact.tsx` → `SOCIALS` array |
| Skills list | `Skills.tsx` → `SKILLS` array |
| Typewriter phrases | `Hero.tsx` → `PHRASES` array |
| EmailJS credentials | `Contact.tsx` → 3 constants at the top |
| Meta tags & OG image URL | `index.html` |
| Resume file | `public/resume.pdf` |
| OG image | `public/og-image.png` |