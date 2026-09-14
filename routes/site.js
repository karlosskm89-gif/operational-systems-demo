const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/", (req, res) => {
  res.render("home", {
    title: "Operational Systems Demo",
    bookingTypes: bookingController.getBookingTypes()
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
  const selectedType = req.query.type ? bookingController.getBookingType(req.query.type) : null;

  if (req.query.type && !selectedType) return res.redirect("/book");

  if (!selectedType) {
    return res.render("book", {
      title: "Booking & Enquiry Workflow",
      bookingTypes: bookingController.getBookingTypes()
    });
  }

  return res.render("booking-form", {
    title: selectedType.label,
    selectedType,
    bookingTypes: bookingController.getBookingTypes(),
    services: bookingController.getServices(),
    options: bookingController.getOptions(),
    errors: [],
    form: { bookingType: selectedType.value }
  });
});

router.post("/book", (req, res, next) => req.requireCsrf(req, res, next), (req, res) => {
  const selectedType = bookingController.getBookingType(req.body.bookingType);
  const errors = bookingController.validateBookingPayload(req.body);

  if (!selectedType || errors.length) {
    return res.status(400).render("booking-form", {
      title: selectedType?.label || "Booking & Enquiry Workflow",
      selectedType: selectedType || bookingController.getBookingTypes()[0],
      bookingTypes: bookingController.getBookingTypes(),
      services: bookingController.getServices(),
      options: bookingController.getOptions(),
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
    title: "Request Received",
    booking: bookingController.toViewModel(booking)
  });
});

router.get("/workflow", (req, res) => {
  const bookings = bookingController.getBookings();
  res.render("workflow", {
    title: "Workflow Overview",
    bookingTypes: bookingController.getBookingTypes(),
    bookings: bookings.map(bookingController.toViewModel),
    stats: bookingController.getStats(bookings)
  });
});

module.exports = router;
