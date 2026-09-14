# Changelog

## 2.0.0 — Flexible booking & enquiry vNext

- Refit the existing Booking Workflow instead of creating prospect-specific parallel demos
- Added four reusable intake patterns: Appointment / Service, Venue / Resource, Group / Visit and Recurring Booking
- Added a neutral `/book` chooser with type-specific public forms
- Added shared admin filtering by workflow status and request type
- Added venue/resource time-overlap checks and bounded recurring-series clash checks
- Expanded workflow states to New, Availability checked, Confirmed, Follow-up, Completed and Cancelled
- Diversified fictional sample data so the proof asset no longer reads as healthcare/wellness-specific
- Added source booking/record references to the Records and Invoice proof modules
- Expanded reports and CSV exports around the broader operational model
- Added validation and controller tests for the new intake architecture
- Reworked the workflow illustration around four intake patterns converging into one operational queue
- Preserved the same reusable ASR Operational Systems Demo identity and deployment target

## 1.4.0 — ASR base layer and Operational Modules

- Added ASR base pages: About, Systems, FAQs and Contact/Next Steps
- Reframed homepage as the ASR operational systems hub
- Reframed `/modules` as Operational Modules, parallel to Starter Kit Showcase Mode
- Updated navigation and footer to separate ASR base from demo modules
- Preserved Booking, Records and Invoice modules inside Operational Modules
- Updated README to explain the Repo 1 / Repo 2 parallel architecture

## 1.3.0 — Skeleton operational modules

- Added `/modules` operational module overview
- Added Records skeleton module with list/detail views
- Added Invoice Workflow skeleton module with list/detail/export views
- Added public-safe records and invoice demo data
- Added operational controller for future module growth
- Updated navigation, README and module roadmap
- Extended tests to cover records and invoices

## 1.2.0 — Operational systems refactor

- Refactored repo from focused booking-flow demo into `asr-operational-systems-demo`
- Repositioned booking workflow as the first operational module
- Updated homepage, layout, README and docs around operational systems proof
- Added future module roadmap for records, invoice workflows and admin dashboards
- Preserved the narrow booking workflow as the current working module
- Kept public-safe demo data and test coverage

## 1.1.0 — Public ecosystem polish

- Renamed package to `asr-operational-systems-demo`
- Added `/workflow` overview route
- Improved README with ecosystem positioning
- Added screenshot guide
- Added public-readiness notes
- Added ecosystem positioning documentation
- Added starter-kit repo reference
- Improved homepage links to workflow overview
- Preserved narrow demo scope

## 1.0.0 — ASR-aligned booking workflow demo

- Public booking request flow
- Admin dashboard
- Booking detail view
- Status updates
- CSV export
- ASR-aligned visual identity
