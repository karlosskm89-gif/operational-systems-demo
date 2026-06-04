# ASR Operational Systems Demo

Public-safe Express/EJS demo showing the operational layer behind service-business work: intake, admin visibility, status handling, records, invoices and CSV export patterns.

Live demo: https://asr-operational-systems-demo.onrender.com

## What this demonstrates

- Booking/enquiry intake with confirmation state
- Public demo admin queue, detail view and status workflow
- Demo reset route for local sample mutations
- CSV export pattern through `/admin/export.csv`
- Records and invoice module examples
- Helmet, rate limiting and CSRF protection on POST actions
- Compressed public assets and page-specific canonical URLs

## Ecosystem role

This is Demo Repo 2 in the ASR proof ecosystem. The Starter Kit shows adaptable public website foundations; this repo shows the internal workflow layer that can sit behind them.

## Main routes

```text
/                   Overview
/book               Public booking request form
/confirmation/:id   Confirmation state
/workflow           Workflow overview
/about              About this demo
/services           Operational systems overview
/faqs               FAQs
/contact            Contact / next steps
/modules            Module overview
/modules/records    Records module
/modules/invoices   Invoice module
/admin              Public demo admin dashboard
/admin/bookings/:id Booking detail
/admin/export.csv   CSV export
```

## Local development

```bash
npm install
npm start
npm test
```

Open `http://localhost:8000`.

## Public-safety notes

This repo contains sample JSON only. The admin area is intentionally visible as a demo, clearly labelled, and does not contain credentials or real client data. Status changes mutate local sample data only, CSV export is generated from that sample dataset, and the demo can be reset from the dashboard.

Large source PNG logo files are excluded from the release package; runtime assets use compressed WebP files and a compact generated favicon.

## Docs

The `docs/` folder contains short supporting notes for ecosystem positioning, workflow structure, module roadmap, visual alignment, browser/social preview checks and screenshots.

## Licence

MIT — see `LICENSE`.
