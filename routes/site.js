const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/", (req, res) => {
  res.render("home", {
    title: "Operational Systems Demo",
    services: bookingController.getServices()
  });
});


router.get("/about", (req, res) => res.redirect(301, "/workflow"));

router.get("/services", (req, res) => res.redirect(301, "/modules"));

router.get("/faqs", (req, res) => res.redirect(301, "/workflow"));

router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact / Next Steps"
  });
});

router.get("/module-mode", (req, res) => {
  res.redirect("/modules");
});


router.get("/book", (req, res) => {
  res.render("book", {
    title: "Request a Booking",
    services: bookingController.getServices(),
    errors: [],
    form: {}
  });
});

router.post("/book", (req, res, next) => req.requireCsrf(req, res, next), (req, res) => {
  const required = ["name", "email", "service", "date", "time"];
  const errors = required
    .filter((field) => !req.body[field])
    .map((field) => `${field} is required`);

  if (errors.length) {
    return res.status(400).render("book", {
      title: "Request a Booking",
      services: bookingController.getServices(),
      errors,
      form: req.body
    });
  }

  const booking = bookingController.createBooking(req.body);
  res.redirect(`/confirmation/${booking.id}`);
});

router.get("/confirmation/:id", (req, res) => {
  const booking = bookingController.getBookingById(req.params.id);
  if (!booking) return res.status(404).render("not-found", { title: "Not Found" });

  res.render("confirmation", {
    title: "Booking Request Received",
    booking
  });
});

router.get("/workflow", (req, res) => {
  res.render("workflow", {
    title: "Workflow Overview",
    services: bookingController.getServices(),
    bookings: bookingController.getBookings(),
    stats: bookingController.getStats()
  });
});

module.exports = router;
