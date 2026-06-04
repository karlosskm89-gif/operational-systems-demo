const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/", (req, res) => {
  const status = req.query.status || "All";
  let bookings = bookingController.getBookings();

  if (status !== "All") {
    bookings = bookings.filter((booking) => booking.status === status);
  }

  res.render("admin/dashboard", {
    title: "Admin Dashboard",
    bookings,
    status,
    stats: bookingController.getStats()
  });
});

router.get("/bookings/:id", (req, res) => {
  const booking = bookingController.getBookingById(req.params.id);
  if (!booking) return res.status(404).render("not-found", { title: "Not Found" });

  res.render("admin/detail", {
    title: `Booking ${booking.id}`,
    booking
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
  const header = ["id", "name", "email", "phone", "service", "date", "time", "status"];
  const csv = [
    header.join(","),
    ...rows.map((row) => header.map((field) => `"${String(row[field] || "").replaceAll('"', '""')}"`).join(","))
  ].join("\n");

  res.header("Content-Type", "text/csv");
  res.attachment("booking-flow-demo-export.csv");
  res.send(csv);
});

module.exports = router;
