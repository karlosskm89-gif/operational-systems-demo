# ASR Operational Systems Demo

A public showcase repository demonstrating workflow, administration and reporting concepts commonly found in operational systems.

This project shows how an internal workflow layer can sit behind a public-facing website, helping preserve context, improve visibility and reduce administrative friction.

## What this demonstrates

- Booking and enquiry intake
- Admin review and status handling
- Records and operational history
- Invoicing and financial visibility
- Reporting and CSV export capability
- Public-safe sample data suitable for portfolio use

## Ecosystem role

This repository represents **Workflow Proof** within the ASR ecosystem.

Related proof assets:

- ForwardSteps — Operational Proof
- Aid Cancer Treatment — Relationship Proof
- Starter Kit — Foundation Proof
- ASR Website — Marketing Proof

## Live demo

https://asr-operational-systems-demo.onrender.com

## Running locally

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

## Main routes

```text
/                         Overview
/book                     Public booking/enquiry flow
/admin                    Public-safe admin dashboard
/admin/export.csv         CSV export
/modules                  Operational modules
/modules/records          Records and operational history
/modules/invoices         Invoices and financial visibility
/workflow                 Workflow explanation
/healthz                  Health check
```
## Screenshots

### Dashboard Overview
![Dashboard](screenshots/dashboard-overview.png)

### Booking Workflow
![Booking Workflow](screenshots/booking-workflow.png)

### Records Management
![Records](screenshots/records-management.png)

### Invoice Visibility
![Invoices](screenshots/invoice-visibility.png)

### Workflow Documentation
![Workflow](screenshots/workflow-diagram.png)

## Workflow Overview

This demonstration models a common service-business workflow:

Enquiry →
Booking →
Admin Review →
Operational Record →
Invoice →
Reporting

The objective is to show how operational visibility can reduce administrative friction while improving consistency and record keeping.

## Admin Visibility

The demo includes a public-safe administration area designed to illustrate:

- Booking review
- Status management
- Record history
- Invoice tracking
- Operational reporting
- CSV export capability

No real client information is included.
All data is fictional and intended for demonstration purposes only.

## Technology

- Node.js
- Express
- EJS
- HTML
- CSS
- JavaScript

## Architecture

This project follows a modular Express/EJS structure:

controllers/
data/
public/
routes/
views/

The design separates workflow logic, presentation and reporting concerns to keep the system maintainable as operational requirements grow.

  
## Public-safe boundary

This repo uses fictional/demo data only. It is intended to demonstrate workflow patterns, not expose private client systems.

## Notes

Supporting documentation and historical cleanup notes are stored in `/docs`.
