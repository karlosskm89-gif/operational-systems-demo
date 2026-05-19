# ASR Operational Systems Demo

A public-safe operational systems demo for service businesses, practices and small organisations.

This is **repo #2** in the ASR public proof ecosystem. It complements the main [`asr-web-services-starter-kit`](https://github.com/karlosskm89-gif/asr-web-services-starter-kit) repository.

Where the starter kit demonstrates adaptable website/profile systems, this repo demonstrates the operational layer behind real-world workflows: intake, admin visibility, status handling, records and export-ready infrastructure.

---

## Structure

This repo now mirrors the starter-kit pattern:

- **ASR base layer** — homepage, about, systems, FAQ and contact/next-step pages
- **Module Mode** — the public demo area for booking, records and invoice workflow modules

This keeps the ASR identity fixed while allowing visitors to explore demo operational modules separately.

## Current module

The first module is a focused **booking workflow demo**.

It demonstrates:

- public booking/enquiry intake
- validation and confirmation state
- admin queue
- booking detail view
- status workflow
- filtered admin view
- CSV export
- public-safe demo data
- maintainable Express/EJS structure
- shared ASR visual identity using the same asset set as the starter-kit repo

The point is not to pretend this is a production SaaS platform.

The point is to demonstrate practical operational UX:

> capture the request, review it, manage its status, and export useful workflow data.

---

## Ecosystem position

### Repo 1 — ASR Web Services Starter Kit

Demonstrates:

- ASR core identity
- adaptable business profiles
- Showcase Mode/profile switching
- fictionalised website examples
- case-study structure

### Repo 2 — ASR Operational Systems Demo

Demonstrates:

- booking and enquiry intake
- admin handling
- status workflows
- export-oriented infrastructure
- records and invoice skeleton modules

Together, they show two sides of the ASR approach:

1. public-facing web systems
2. internal operational workflows

---

## Included modules

### Booking Workflow

The current complete module:
- public intake form
- confirmation state
- admin queue
- status handling
- CSV export

### Records Module

A lightweight skeleton module:
- demo record list
- record detail view
- public-safe sample data
- operational structure placeholder

### Invoice Workflow

A lightweight skeleton module:
- demo invoice list
- invoice detail view
- invoice status fields
- CSV export route

The goal is not to become a fake enterprise platform.

The goal is to show believable, maintainable operational patterns.

---

## Routes

```txt
/                   Overview
/book               Public booking request form
/confirmation/:id   Confirmation state
/workflow           System overview
/about              About this repo
/services           Operational systems overview
/faqs               FAQs
/contact            Contact / next steps
/modules            Module Mode overview
/modules/records    Records skeleton module
/modules/invoices   Invoice workflow skeleton
/admin              Admin module dashboard
/admin/bookings/:id Booking detail view
/admin/export.csv   CSV export
```

---

## Technology

- Node.js
- Express
- EJS
- CSS
- JSON demo data

---

## Run locally

```bash
npm install
npm start
```

Then open:

```txt
http://localhost:3000
```

---

## Test

```bash
npm test
```

---

## Public-safety notes

This repository contains:

- no private client code
- no real production booking data
- no real customer records
- no API keys
- no database credentials

The included booking records are sample demo records only.

---

## Screenshot plan

Recommended screenshots:

```txt
/screenshots
  /public-flow
  /admin
  /workflow
  /mobile
  /future-modules
```

See `docs/screenshot-guide.md` for the full checklist.

---

## About ASR Web Services

ASR Web Services builds practical websites, booking flows, operational workflows and maintainable digital infrastructure for service businesses and organisations.

The focus is not just on launching public websites, but on building calm, useful systems that support real day-to-day operations.


---

## Related ASR Ecosystem Projects

### Main Website
https://asrweb.ie

### ASR Web Services Starter Kit
https://github.com/karlosskm89-gif/asr-web-services-starter-kit

---

## Deployment Notes

### Local Development

```bash
npm install
npm start
```

### Environment Variables

Use `.env.example` as the local starting point.

### Deployment

Designed for:
- Render
- Railway
- Fly.io


## Visual alignment

This repo now uses the same core ASR asset set as the starter-kit repo: `ASR_Logo_Transparent.png`, `ASR_letter_foot.PNG`, and `ASR_logo+mountainsFramed.png`. The intention is for both public demos to feel seamless and coherent while still serving different proof roles.
