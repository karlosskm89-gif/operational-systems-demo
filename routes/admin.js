const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/", (req, res) => {
  const status = req.query.status || "All";
  const type = req.query.type || "All";
  const allBookings = bookingController.getBookings();
  let bookings = [...allBookings];

  if (status !== "All") {
    bookings = bookings.filter((booking) => booking.status === status);
  }

  if (type !== "All") {
    bookings = bookings.filter((booking) => booking.bookingType === type);
  }

  res.render("admin/dashboard", {
    title: "Admin Dashboard",
    bookings: bookings.map(bookingController.toViewModel),
    status,
    type,
    statuses: bookingController.ALLOWED_STATUSES,
    bookingTypes: bookingController.getBookingTypes(),
    stats: bookingController.getStats(allBookings)
  });
});

router.get("/bookings/:id", (req, res) => {
  const booking = bookingController.getBookingById(req.params.id);
  if (!booking) return res.status(404).render("not-found", { title: "Not Found" });

  res.render("admin/detail", {
    title: `Booking ${booking.id}`,
    booking: bookingController.toViewModel(booking),
    statuses: bookingController.ALLOWED_STATUSES
  });
});

router.post("/bookings/:id/status", (req, res, next) => req.requireCsrf(req, res, next), (req, res) => {
  bookingController.updateStatus(req.params.id, req.body.status);
  res.redirect(`/admin/bookings/${req.params.id}`);
});

router.post("/reset-demo", (req, res, next) => req.requireCsrf(req, res, next), (req, res) => {
  bookingController.resetDemoBookings();
  res.redirect("/admin");
});

router.get("/export.csv", (req, res) => {
  const rows = bookingController.getBookings();
  const header = [
    "id", "bookingType", "name", "email", "phone", "service", "resource", "groupType", "activity",
    "date", "time", "startTime", "endTime", "timeWindow", "attendees", "recurrence", "occurrences",
    "requirements", "availabilityStatus", "conflictIds", "status", "message"
  ];

  const csvValue = (row, field) => {
    const value = Array.isArray(row[field]) ? row[field].join(" | ") : row[field];
    return `"${String(value ?? "").replaceAll('"', '""')}"`;
  };

  const csv = [
    header.join(","),
    ...rows.map((row) => header.map((field) => csvValue(row, field)).join(","))
  ].join("\n");

  res.header("Content-Type", "text/csv");
  res.attachment("operational-booking-demo-export.csv");
  res.send(csv);
});

module.exports = router;
