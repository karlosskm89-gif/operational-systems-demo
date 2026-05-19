const assert = require("assert");
const bookingController = require("../controllers/bookingController");
const operationalController = require("../controllers/operationalController");

const services = bookingController.getServices();
assert(Array.isArray(services), "Services should be an array");
assert(services.length >= 3, "Expected demo services");

const bookings = bookingController.getBookings();
assert(Array.isArray(bookings), "Bookings should be an array");

const stats = bookingController.getStats(bookings);
assert.strictEqual(stats.total, bookings.length, "Stats total should match booking count");

const first = bookings[0];
assert(first.id, "Booking should have an id");
assert(first.status, "Booking should have a status");

const records = operationalController.getRecords();
assert(Array.isArray(records), "Records should be an array");
assert(records.length >= 3, "Expected demo records");
assert(operationalController.getRecordById(records[0].id), "Should retrieve record by id");

const invoices = operationalController.getInvoices();
assert(Array.isArray(invoices), "Invoices should be an array");
assert(invoices.length >= 3, "Expected demo invoices");
assert(operationalController.getInvoiceById(invoices[0].id), "Should retrieve invoice by id");

const moduleStats = operationalController.getModuleStats();
assert.strictEqual(moduleStats.recordsTotal, records.length, "Record stats should match record count");
assert.strictEqual(moduleStats.invoicesTotal, invoices.length, "Invoice stats should match invoice count");

console.log("Workflow and module tests passed.");
