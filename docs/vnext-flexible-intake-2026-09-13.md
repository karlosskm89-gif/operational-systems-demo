# Operational Systems Demo vNext — Flexible Intake Refit

Date: 13 September 2026

## Why this refit exists

The original booking proof was useful, but its public intake model was too close to a single appointment/service-business assumption. New prospect conversations showed that the same ASR proof asset needs to speak credibly to organisations handling rooms/resources, group visits and recurring activities as well as appointments.

The decision was to strengthen the existing reusable Operational Systems Demo rather than create a prospect-specific demo or maintain multiple overlapping proof repositories.

## Design rule

**Real prospects reveal gaps in the reusable proof asset. Improve the reusable proof asset rather than quietly building each prospect a free bespoke prototype.**

No prospect or organisation is named in the public demo.

## Public intake patterns

- Appointment / Service
- Venue / Resource
- Group / Visit
- Recurring Booking

All four flows enter the same admin queue.

## Operational behaviour added

- request-type-aware validation
- venue/resource overlap checking
- bounded recurring-series generation and overlap checking
- review/availability state separate from workflow status
- status and request-type filters in the shared admin queue
- diversified fictional sample records
- booking → record → invoice context references in sample downstream modules
- expanded booking/enquiry CSV export
- intake mix included in the reporting view

## Intentional limits

This remains a proof asset, not a universal booking SaaS product. It intentionally does not assume:

- online payment or deposits
- automatic confirmation emails
- production calendar integrations
- arbitrary recurrence rules
- authentication/user roles for a real organisation
- detailed capacity/staffing logic
- invoicing for every booking type

Those decisions belong in discovery for a real implementation.

## Deployment target

This refit is intended to replace the existing code behind the same public demo identity and URL:

`https://asr-operational-systems-demo.onrender.com/`

The preferred prospect experience remains one reusable ASR proof asset rather than a prospect-named route.
