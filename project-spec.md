# Project Spec: Ruah Whyte Consulting

> Last updated: March 2026

---

## 1. Project Overview

**Name:** Ruah Whyte Consulting
**Description:** A clean, professional landing page for a consulting company. Includes a contact form that emails submissions directly to the business owner.
**Target Users:** Potential clients who want to find out more about the company.

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (App Router, TypeScript) |
| Backend | Firebase (Hosting only) |
| Hosting | Firebase App Hosting |
| Styling | Tailwind CSS |
| Transactional Email | ZeptoMail |

---

## 3. Firebase Configuration

### 🚀 LIVE Firebase Project
**Project ID:** `ruah-whyte-consulting`
**App Hosting Backend:** `ruah-whyte-consulting`

#### .env.local (LIVE — never commit this file)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBUhMpkH9bgHt27afuWoroli_O563dS_bM
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ruah-whyte-consulting.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ruah-whyte-consulting
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ruah-whyte-consulting.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=940663147181
NEXT_PUBLIC_FIREBASE_APP_ID=1:940663147181:web:4066837a623cea9be0d424
ZEPTOMAIL_API_KEY=
EMAIL_FROM_ADDRESS=
EMAIL_TO_ADDRESS=
```

#### apphosting.yaml (place in project root)
```yaml
runConfig:
  minInstances: 0

env:
  - variable: NEXT_PUBLIC_FIREBASE_API_KEY
    secret: NEXT_PUBLIC_FIREBASE_API_KEY
    availability: [BUILD, RUNTIME]
  - variable: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    secret: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    availability: [BUILD, RUNTIME]
  - variable: NEXT_PUBLIC_FIREBASE_PROJECT_ID
    secret: NEXT_PUBLIC_FIREBASE_PROJECT_ID
    availability: [BUILD, RUNTIME]
  - variable: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    secret: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    availability: [BUILD, RUNTIME]
  - variable: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
    secret: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
    availability: [BUILD, RUNTIME]
  - variable: NEXT_PUBLIC_FIREBASE_APP_ID
    secret: NEXT_PUBLIC_FIREBASE_APP_ID
    availability: [BUILD, RUNTIME]
  - variable: ZEPTOMAIL_API_KEY
    secret: ZEPTOMAIL_API_KEY
    availability: [RUNTIME]
  - variable: EMAIL_FROM_ADDRESS
    secret: EMAIL_FROM_ADDRESS
    availability: [RUNTIME]
  - variable: EMAIL_TO_ADDRESS
    secret: EMAIL_TO_ADDRESS
    availability: [RUNTIME]
```

#### Secrets Setup (`firebase use ruah-whyte-consulting` first)
```bash
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_API_KEY
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_PROJECT_ID
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_APP_ID
firebase apphosting:secrets:set ZEPTOMAIL_API_KEY
firebase apphosting:secrets:set EMAIL_FROM_ADDRESS
firebase apphosting:secrets:set EMAIL_TO_ADDRESS
```
> Always say **yes** when prompted to grant permissions.

---

## 4. GitHub Repository & Branches

**Repository:** https://github.com/orangesnowtech/ruah-whyte-consulting

| Branch | Purpose | Deploys To |
|--------|---------|-----------|
| `master` | Active development — all work done here | No auto-deploy |
| `live` | Push here to deploy to production | Production server |

**Deploy commands:**
```bash
git push origin master:live   # deploy to production
git checkout master           # always return to master after pushing
```

---

## 5. Pages & Features

### Pages
- Home (single landing page)

### Core Features
- Hero section
- About / company overview
- Services section
- Contact form (submits via API route → ZeptoMail → delivered to business owner)

---

## 6. Look & Feel

**Design vibe:** Clean and professional
**Figma file:** None — build to match brand colors and vibe
**Reference sites:** None provided

| Color Role | Hex |
|-----------|-----|
| Primary | `#38346a` |
| Secondary | `#0974c2` |
| Black | `#040405` |

**Logo:** `ruah-whyte-logo.png`

---

## 7. Transactional Email

All email logic lives in `/lib/email/`. Never called from client components.

**Provider:** ZeptoMail
**From address:** stored as `EMAIL_FROM_ADDRESS` secret
**To address:** stored as `EMAIL_TO_ADDRESS` secret (contact form submissions delivered here)
**API key:** `ZEPTOMAIL_API_KEY` (server-only — no `NEXT_PUBLIC_` prefix, ever)

| Email Type | Trigger | Module |
|-----------|---------|--------|
| Contact form notification | User submits contact form | `lib/email/contactEmail.ts` |

---

## 8. Static Content Files

All files live in `/content/`. Always accessed via `/lib/content/` loaders — never imported directly into components.

| File | Format | Loader | Migrate to Sanity? |
|------|--------|--------|-------------------|
| Company profile / about content | Word (.docx) | `lib/content/companyProfile.ts` | Maybe later |

---

*This file is the source of truth for this project. Update it as the project evolves.*
