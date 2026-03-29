# GitHub Copilot Master Prompt — Ruah Whyte Consulting

> **How to use:** Open GitHub Copilot Chat in VS Code. First say:
> *"Read COPILOT_MEMORY.md before we begin."*
> Then paste the prompt below.

---

## THE PROMPT (copy everything below this line)

---

You are helping me build **Ruah Whyte Consulting** — a clean, professional landing page for a consulting company. Potential clients visiting the site want to learn more about the company and get in touch.

Before writing any code, read `COPILOT_MEMORY.md` in the project root. That file contains all deployment rules, stack decisions, and workflow rules that must be followed throughout this project.

---

### Project Stack

- **Frontend:** Next.js (App Router, TypeScript)
- **Hosting:** Firebase App Hosting — deploying = pushing to the `live` branch on GitHub
- **Styling:** Tailwind CSS
- **Transactional Email:** ZeptoMail (contact form notifications only)

---

### Firebase Configuration

The Firebase project ID is `ruah-whyte-consulting`.

Set up `lib/firebase/client.ts` using these environment variables (configured as secrets in Firebase Secret Manager):

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

There is no backend database or Firebase Admin SDK needed for this project.

---

### Pages & Features

**Single landing page with these sections:**
- Hero — strong headline, brief tagline, CTA button to contact section
- About — company overview (content loaded from `lib/content/companyProfile.ts`)
- Services — key services offered (content loaded from `lib/content/companyProfile.ts`)
- Contact form — name, email, message fields; submits to `/app/api/contact/route.ts` which sends a ZeptoMail notification to the business owner

---

### Contact Form & Email

The contact form must **never** submit directly from the client to ZeptoMail.

Flow:
1. User fills out and submits the contact form (client component)
2. Form POSTs to `/app/api/contact/route.ts` (Next.js API route — server-side only)
3. API route calls `sendContactEmail()` from `/lib/email/contactEmail.ts`
4. ZeptoMail delivers the notification to the business owner

ZeptoMail credentials are server-side only:
- `ZEPTOMAIL_API_KEY` — API key, never exposed to browser
- `EMAIL_FROM_ADDRESS` — sender address
- `EMAIL_TO_ADDRESS` — where form submissions are delivered

---

### Static Content

Company profile content is stored in `/content/company-profile.docx`.
Access it only through the loader at `/lib/content/companyProfile.ts` — never import content files directly into components.

The loader should read from the local file for now, with a Sanity query pre-written but commented out for future migration.

---

### Look & Feel

**Design vibe:** Clean and professional
**No Figma file** — use brand colors and vibe to guide all UI decisions

Brand colors:
- Primary: `#38346a` (deep purple)
- Secondary: `#0974c2` (blue)
- Black: `#040405`

**Logo:** `ruah-whyte-logo.png` — place in `/public/`, use in the site header.

Typography should feel professional and readable. Generous whitespace. No clutter.

---

### Deployment Workflow (from COPILOT_MEMORY.md)

- All work on `master` branch
- Push to `live` branch to deploy: `git push origin master:live`
- Always return to master after pushing: `git checkout master`
- Firebase App Hosting auto-deploys on push — no separate deploy command

---

### Project Structure
```
/app
  /api/contact/route.ts     ← contact form API route
  page.tsx                  ← landing page
  layout.tsx
/components                 ← UI components
/lib
  /firebase/client.ts       ← Firebase init
  /email/contactEmail.ts    ← ZeptoMail contact notification
  /content/companyProfile.ts ← content loader
/content
  company-profile.docx      ← static content file
/public
  ruah-whyte-logo.png       ← logo
apphosting.yaml             ← Firebase App Hosting config
COPILOT_MEMORY.md
project-spec.md
```

---

### What to Build First

1. Project scaffolding — folder structure, Firebase client init, Tailwind config, base layout
2. Content loader — `lib/content/companyProfile.ts` reading from the Word file
3. Landing page sections — Hero, About, Services using content from the loader
4. Contact form component + API route + ZeptoMail email module
5. Final polish — responsive layout, logo in header, brand colors throughout

Ask me before making major design or architectural decisions.

Let's begin.

---
*Refer to `project-spec.md` for full technical details.*
