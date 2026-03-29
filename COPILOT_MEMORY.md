# COPILOT MEMORY — Ruah Whyte Consulting

> **GitHub Copilot: Read this file at the start of every session before writing any code.**
> This is the source of truth for how this project is built and deployed.

---

## Project

**Name:** Ruah Whyte Consulting
**Description:** A clean, professional landing page for a consulting company with a contact form that emails submissions to the business owner.
**Target users:** Potential clients looking to learn more about the company.

---

## Tech Stack

- **Frontend:** Next.js (App Router, TypeScript)
- **Hosting:** Firebase App Hosting — deploying = pushing to the `live` branch
- **Styling:** Tailwind CSS
- **Transactional Email:** ZeptoMail (contact form notifications)

---

## Deployment Rules — READ CAREFULLY

Firebase App Hosting deploys automatically when you push to the `live` branch.
**There is no separate deploy command. Pushing = Deploying.**

**Repository:** https://github.com/orangesnowtech/ruah-whyte-consulting

| Branch | Deploys To | Firebase Project |
|--------|-----------|-----------------|
| `master` | No auto-deploy — all work done here | — |
| `live` | Production | ruah-whyte-consulting |

### Deployment Workflow (Follow Every Time)
```
1. Do all work on master branch
2. When ready to go live:
     git push origin master:live
3. ALWAYS return to master after pushing:
     git checkout master
```

**Never work on the live branch directly. Always return to master.**

---

## Environment Variables & Secrets

Firebase App Hosting uses Google Cloud Secret Manager — not `.env` files in production.

- `NEXT_PUBLIC_` prefix → browser-safe, baked into JS bundle at build time
- No prefix → server-side only, never sent to browser
- Local dev: use `.env.local` (never commit this file)
- Production: set via `firebase apphosting:secrets:set`
- ZeptoMail key in `.env.local`: `ZEPTOMAIL_API_KEY=your_key`
- Email addresses in `.env.local`: `EMAIL_FROM_ADDRESS=` and `EMAIL_TO_ADDRESS=`

---

## Transactional Email

All transactional emails are sent via ZeptoMail.
All email logic lives in `/lib/email/` — never called from client components or files with `'use client'`.

**From address:** `EMAIL_FROM_ADDRESS` (stored in Secret Manager)
**To address:** `EMAIL_TO_ADDRESS` (stored in Secret Manager — contact form deliveries go here)
**API key:** `ZEPTOMAIL_API_KEY` (server-only — no `NEXT_PUBLIC_` prefix, ever)

### Email types for this project:
- **Contact form notification** — triggered by: user submitting the contact form → `lib/email/contactEmail.ts`

### Pattern for each email module:
```typescript
// /lib/email/contactEmail.ts
// Never import this in a 'use client' file

const ZEPTOMAIL_API_KEY = process.env.ZEPTOMAIL_API_KEY!
const FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS!
const TO_ADDRESS = process.env.EMAIL_TO_ADDRESS!

export async function sendContactEmail(params: {
  name: string
  email: string
  message: string
}) {
  const res = await fetch('https://api.zeptomail.com/v1.1/email', {
    method: 'POST',
    headers: {
      'Authorization': `Zoho-enczapikey ${ZEPTOMAIL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: { address: FROM_ADDRESS, name: 'Ruah Whyte Consulting' },
      to: [{ email_address: { address: TO_ADDRESS } }],
      subject: `New contact form submission from ${params.name}`,
      htmlbody: `
        <p><strong>Name:</strong> ${params.name}</p>
        <p><strong>Email:</strong> ${params.email}</p>
        <p><strong>Message:</strong> ${params.message}</p>
      `,
    }),
  })
  if (!res.ok) throw new Error(`ZeptoMail error: ${res.statusText}`)
}
```

### Rules
- ❌ Never call ZeptoMail from a client component or any file marked `'use client'`
- ❌ Never expose `ZEPTOMAIL_API_KEY` to the browser
- ✅ Contact form submits to a Next.js API route (`/app/api/contact/route.ts`)
- ✅ The API route calls `sendContactEmail()` from `/lib/email/contactEmail.ts`

---

## Static Content Files

All content files live in `/content/` in the project root.
All content is accessed through `/lib/content/` loaders — never imported directly into components.

### Pattern for each content type:
```typescript
// /lib/content/companyProfile.ts
import fs from 'fs'
import path from 'path'

export async function getCompanyProfile() {
  // Current: read from local file
  const filePath = path.join(process.cwd(), 'content', 'company-profile.docx')
  return fs.readFileSync(filePath)

  // TODO: migrate to Sanity — uncomment below and remove above when ready
  // return await sanityClient.fetch(`*[_type == "companyProfile"][0]`)
}
```

### Content files for this project:
- `content/company-profile.docx` — company overview, services, about content → loader: `lib/content/companyProfile.ts`

To update content: replace the file in `/content/`. No code changes needed.

---

## Brand & Design

**Vibe:** Clean and professional
**Primary:** `#38346a` | **Secondary:** `#0974c2` | **Black:** `#040405`
**Logo:** `ruah-whyte-logo.png` (place in `/public/`)
**Figma:** None — build to match brand colors and vibe above

When building UI, match the clean and professional vibe using the brand colors above.
Use the logo from `/public/ruah-whyte-logo.png` in the header.

---

## What NOT To Do

- ❌ Never commit `.env.local` or any file containing secrets
- ❌ Never use `NEXT_PUBLIC_` prefix for secret/private keys
- ❌ Never stay on the `live` branch — always return to `master`
- ❌ Never call ZeptoMail from a client component or `'use client'` file
- ❌ Never put `ZEPTOMAIL_API_KEY` in a `NEXT_PUBLIC_` variable
- ❌ Never handle contact form submission client-side — always via `/app/api/contact/route.ts`

---

*Keep this file updated as the project evolves. Copilot should re-read it at the start of each new session.*
