# AjmerFoodie — Official Creator Landing & Collaboration Portal
### Dr. Shikha Mathur | Award-Winning Food, Lifestyle & Travel Influencer

This is a modern, high-converting, mobile-optimized landing page and media kit portfolio built for **Dr. Shikha Mathur (@ajmerfoodie)**.

---

## ✨ Features

- **Luxury Royal Rajasthani Aesthetic:** Curated color palette (Terracotta saffron `#D94826`, heritage gold `#C98A2C`, royal blue accents, warm ivory linen backgrounds) with typography (`Outfit` and `Playfair Display`).
- **Creator Metrics & Media Kit:**
  - **70K+** Instagram followers (@ajmerfoodie)
  - **10K+** Facebook community
  - **10+ Years** content legacy
  - **1.5M+** Monthly impressions
  - Geo & demographic breakdown charts
- **Core Pillars Showcase:**
  - 🍽️ Restaurant & Food Reviews (Royal Rajputana thalis, street food gems, cafe tastings)
  - 🏰 Luxury Staycations & Travel (Palaces, heritage properties, resorts)
  - 🌿 Lifestyle & Doctor's Perspective (Holistic balance, health, nutrition, wellness)
  - 🎤 Event Appearances & Media Features (TV awards, food festivals, jury)
- **Interactive Visual Content Grid:** Filterable tabs (*All*, *Food*, *Travel*, *TV & Press*) linking directly to Instagram Reels and YouTube coverage.
- **Collaboration Packages & Rate Card:**
  - *Spotlight Feature* (1 Reel + 2 Stories)
  - *360° Signature Campaign* (2 Reels + 5 Stories + Photo Carousel)
  - *Resort & Luxury Experience* (Full Staycation + Multi-Reel + Promo code)
  - Direct 1-click package pre-fill into the inquiry form.
- **Dual Fast-Track Inquiry System:**
  - **WhatsApp Direct Send (`+91-8005888490`):** Validates the inquiry and generates a formatted message with brand name, deliverables, budget, and brief directly in WhatsApp.
  - **Email Integration (`Drskhmat29@gmail.com`):** Launches email client with pre-composed professional collaboration brief.
  - One-click copy buttons for email and phone numbers with toast alerts.
- **Mobile First Optimization:**
  - Sticky bottom action bar for on-the-go PR and brand managers (*WhatsApp Chat* + *Collaborate Now*).
  - Responsive hamburger menu.
  - Accordion FAQ for brand questions.

---

## 🚀 How to Run Locally

1. Open a terminal in this directory:
   ```bash
   cd c:\Users\Lenovo\Documents\AjmerFoodie
   ```
2. Start the local development server (serves static assets + `/api/contact` serverless endpoint):
   ```bash
   npm run dev
   ```
   *(Or use `npx vercel dev` / `python -m http.server 8080`)*
3. Open `http://localhost:3000` in your browser.

---

## 🌐 Deploying to Vercel

1. **Import or Deploy via CLI:**
   ```bash
   npx vercel
   ```
   Or connect your Git repository to Vercel (Framework Preset: **Other**).
2. **Environment Variables (Optional, for direct automated email delivery):**
   Add the following in your Vercel Project Settings &rarr; **Environment Variables** (see `.env.example`):
   - `RESEND_API_KEY`: Your Resend API key (`re_...`)
   - `NOTIFICATION_EMAIL`: `Drskhmat29@gmail.com` (default)
   - `SENDER_EMAIL`: `AjmerFoodie Collabs <onboarding@resend.dev>` (or your verified domain sender)
   *(If `RESEND_API_KEY` is not set, `/api/contact` logs the inquiry and seamlessly triggers the visitor's email client as a fallback.)*
3. **Custom Domain:** Ready to attach to `ajmerfoodie.com` or `ajmerfoodie.in`.
