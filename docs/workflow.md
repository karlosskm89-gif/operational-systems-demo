# Flexible Booking & Enquiry Workflow

The vNext booking module is designed around a simple principle:

**Different operational inputs can feed one manageable internal workflow.**

## Public intake patterns

1. **Appointment / Service** — service, date and time.
2. **Venue / Resource** — resource, date, start/end time, attendees and requirements.
3. **Group / Visit** — group type, preferred date/time window, group size and requirements, followed by staff review.
4. **Recurring Booking** — activity, resource, bounded recurrence pattern, duration and sample availability checks.

These are not separate products. They are reusable intake patterns feeding the same admin queue.

## Shared operational path

1. A visitor chooses the kind of request they need to make.
2. The public form asks only for fields relevant to that request type.
3. Venue/resource-led requests run a sample resource/time overlap check.
4. Recurring requests generate a bounded series of dates and check those dates against sample resource bookings.
5. Group/visit requests remain deliberately review-led because capacity, staffing and programme rules are organisation-specific.
6. Every request enters the same admin queue.
7. Staff can filter by request type and workflow status.
8. Staff can move requests through New, Availability checked, Confirmed, Follow-up, Completed or Cancelled.
9. Structured data can be exported to CSV.
10. Accepted work can conceptually carry forward into records, invoices and reporting where the real process requires it.

## What the demo intentionally does not assume

- online payment or deposits
- automatic customer emails
- production calendar integrations
- staff/user authentication rules
- arbitrary calendar recurrence logic
- capacity rules for every resource
- invoicing for every booking
- a single industry or organisation type

Those are discovery decisions, not demo assumptions.

## Why this matters

The original booking proof used a service-business appointment model. Real prospect conversations showed that a stronger ASR proof asset needed to demonstrate rooms/resources, group visits and recurring use without turning the repo into several separate demos.

The refit keeps one reusable asset and broadens the intake architecture instead.
