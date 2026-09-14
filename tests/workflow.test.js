const assert = require("assert");
const bookingController = require("../controllers/bookingController");
const operationalController = require("../controllers/operationalController");

bookingController.resetDemoBookings();

const services = bookingController.getServices();
assert(Array.isArray(services), "Services should be an array");
assert(services.length >= 3, "Expected appointment service examples");

const bookingTypes = bookingController.getBookingTypes();
assert.deepStrictEqual(
  bookingTypes.map((type) => type.value),
  ["appointment", "venue", "group", "recurring"],
  "Expected four reusable intake patterns"
);

const bookings = bookingController.getBookings();
assert(Array.isArray(bookings), "Bookings should be an array");
assert(bookings.length >= 5, "Expected diversified demo bookings");
assert.strictEqual(new Set(bookings.map((booking) => booking.bookingType)).size, 4, "Seed data should cover all four intake types");

const stats = bookingController.getStats(bookings);
assert.strictEqual(stats.total, bookings.length, "Stats total should match booking count");
assert.strictEqual(stats.typeCount, 4, "Stats should report all four booking types");

const venueConflict = bookingController.findResourceConflicts({
  bookingType: "venue",
  resource: "Meeting Room",
  date: "2026-10-08",
  startTime: "15:00",
  endTime: "16:00"
}, bookings);
assert(venueConflict.includes("BK-1002"), "Venue flow should detect overlapping resource use");

const venueNoConflict = bookingController.findResourceConflicts({
  bookingType: "venue",
  resource: "Meeting Room",
  date: "2026-10-08",
  startTime: "18:00",
  endTime: "19:00"
}, bookings);
assert.strictEqual(venueNoConflict.length, 0, "Non-overlapping resource request should not clash");

const recurringDates = bookingController.getOccurrenceDates({
  bookingType: "recurring",
  date: "2026-10-01",
  recurrence: "fortnightly",
  occurrences: 4
});
assert.deepStrictEqual(
  recurringDates,
  ["2026-10-01", "2026-10-15", "2026-10-29", "2026-11-12"],
  "Recurring flow should generate bounded occurrence dates"
);

const invalidVenue = bookingController.validateBookingPayload({
  bookingType: "venue",
  name: "Demo User",
  email: "demo@example.com",
  resource: "Meeting Room",
  date: "2026-10-20",
  startTime: "16:00",
  endTime: "15:00",
  attendees: "8"
});
assert(invalidVenue.some((error) => error.includes("End time")), "Venue validation should reject reversed time ranges");

const tamperedVenue = bookingController.validateBookingPayload({
  bookingType: "venue",
  name: "Demo User",
  email: "not-an-email",
  resource: "Invented Resource",
  date: "2026-10-20",
  startTime: "14:00",
  endTime: "15:00",
  attendees: "1000"
});
assert(tamperedVenue.some((error) => error.includes("valid email")), "Server validation should reject malformed email input");
assert(tamperedVenue.some((error) => error.includes("valid resource")), "Server validation should reject out-of-list resources");
assert(tamperedVenue.some((error) => error.includes("between 1 and 999")), "Server validation should enforce attendee bounds");

const validGroup = bookingController.validateBookingPayload({
  bookingType: "group",
  name: "Demo Group",
  email: "group@example.com",
  groupType: "Community group",
  date: "2026-10-22",
  timeWindow: "Morning",
  attendees: "20"
});
assert.strictEqual(validGroup.length, 0, "Group flow should validate a complete review-led request");

const created = bookingController.createBooking({
  bookingType: "venue",
  name: "Test Request",
  email: "test@example.com",
  resource: "Meeting Room",
  date: "2026-10-08",
  startTime: "15:15",
  endTime: "15:45",
  attendees: "4",
  requirements: ["Projector / screen"],
  message: "Automated test request"
});
assert.strictEqual(created.bookingType, "venue", "Created request should preserve booking type");
assert.strictEqual(created.availabilityStatus, "Potential clash", "Created venue request should store clash result");
assert(created.conflictIds.includes("BK-1002"), "Created venue request should reference conflicting sample booking");

const viewModel = bookingController.toViewModel(created);
assert.strictEqual(viewModel.typeLabel, "Venue / Resource", "View model should expose a readable type label");
assert(viewModel.schedule.includes("15:15"), "View model should expose a useful schedule summary");

const updated = bookingController.updateStatus(created.id, "Availability checked");
assert.strictEqual(updated.status, "Availability checked", "Admin workflow should support the expanded status set");
assert.strictEqual(bookingController.updateStatus(created.id, "Not a status"), null, "Invalid status should be rejected");

const records = operationalController.getRecords();
assert(Array.isArray(records), "Records should be an array");
assert(records.length >= 4, "Expected diversified demo records");
assert(records.every((record) => record.sourceBookingId), "Demo records should show source booking context");
assert(operationalController.getRecordById(records[0].id), "Should retrieve record by id");

const invoices = operationalController.getInvoices();
assert(Array.isArray(invoices), "Invoices should be an array");
assert(invoices.length >= 3, "Expected demo invoices");
assert(invoices.every((invoice) => invoice.sourceRecordId), "Demo invoices should show downstream record context");
assert(operationalController.getInvoiceById(invoices[0].id), "Should retrieve invoice by id");

const moduleStats = operationalController.getModuleStats();
assert.strictEqual(moduleStats.recordsTotal, records.length, "Record stats should match record count");
assert.strictEqual(moduleStats.invoicesTotal, invoices.length, "Invoice stats should match invoice count");

bookingController.resetDemoBookings();
console.log("Operational Systems Demo vNext tests passed.");
