# ASR Operational Systems Demo

A public-safe ASR proof repository demonstrating flexible intake, shared administration, operational records, invoice visibility, reporting and export-ready workflows.

This project shows how an operational layer can sit behind a public-facing website. The public questions can change around the job while staff still receive structured, reviewable work inside one coherent admin system.

## What this demonstrates

- Four reusable booking/enquiry intake patterns
  - Appointment / Service
  - Venue / Resource
  - Group / Visit
  - Recurring Booking
- One shared admin queue for all request types
- Resource/time overlap checks for venue and recurring requests
- Bounded recurring-date generation for demonstration purposes
- Operational status handling and type/status filtering
- Records that can preserve context after intake
- Invoicing and financial visibility as an optional downstream layer
- Reporting and CSV export capability
- Public-safe fictional data suitable for portfolio and sales conversations

## Core design principle

**Different operational inputs → one manageable workflow → records → financial/admin visibility → reporting**

The demo is intentionally not presented as an off-the-shelf booking product. It proves reusable building blocks and workflow thinking. Real implementations should be shaped around the organisation's actual rules instead of assuming payments, deposits, notifications, approval logic or integrations before discovery.

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
http://localhost:8000
```

## Main routes

```text
/                         Overview
/book                     Booking/enquiry pattern chooser
/book?type=appointment    Appointment / Service flow
/book?type=venue          Venue / Resource flow
/book?type=group          Group / Visit flow
/book?type=recurring      Recurring Booking flow
/admin                    Shared public-safe admin queue
/admin/export.csv         Booking/enquiry CSV export
/modules                  Operational modules
/modules/records          Records and operational history
/modules/invoices         Invoices and financial visibility
/modules/reports          Reporting and export capability
/workflow                 Workflow explanation
/healthz                  Health check
```

## Booking and enquiry architecture

The four public flows are deliberately different at intake but converge into the same booking/enquiry record model and admin workflow.

### Appointment / Service

Captures a familiar service, date and time request. This preserves the original appointment-led use case without making it the conceptual centre of the whole demo.

### Venue / Resource

Captures a room/resource, date, start/end times, attendee count and practical requirements. The demo checks the request against existing sample venue/recurring bookings for the same resource and overlapping time.

### Group / Visit

Captures group type, preferred date/time window, group size and practical requirements. This flow intentionally remains staff-review-led instead of pretending every organised visit should be auto-confirmed.

### Recurring Booking

Captures an activity, resource, first date, time range, recurrence pattern and bounded series length. The demo checks the generated sample dates for resource clashes. It is intentionally limited to 4/6/8/12 occurrences rather than attempting to reproduce a full calendar recurrence engine.

## Shared admin workflow

All request types appear in one admin queue with:

- type and status filters
- readable request/schedule summaries
- review/availability state
- potential conflict references
- workflow status updates
- CSV export
- resettable public-safe sample data

Supported workflow statuses:

```text
New
Availability checked
Confirmed
Follow-up
Completed
Cancelled
```

## Downstream modules

Records and invoices are still lightweight proof modules, but the sample data now demonstrates a clearer relationship between intake, operational history and financial visibility using `sourceBookingId` and `sourceRecordId` references.

## Public-safe boundary

No real client information is included. All names, organisations, bookings, records and invoices are fictional demonstration data.

The public admin is intentionally unauthenticated because it contains only resettable sample information. Production systems would use appropriate authentication, authorisation, persistence, audit and data-protection controls.

## Technology

- Node.js
- Express
- EJS
- HTML
- CSS
- JavaScript
- JSON demo persistence

## Architecture

```text
controllers/
data/
public/
routes/
views/
```

Booking rules are centralised in `controllers/bookingController.js`, while configurable labels/options live in `data/booking-options.json`.

## Tests

```bash
npm test
```

The test suite covers the four intake types, venue overlap checking, recurring-date generation, validation, status handling and the downstream record/invoice proof modules.

## Notes

Supporting documentation and historical cleanup notes are stored in `/docs`.
