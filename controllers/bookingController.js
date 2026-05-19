const fs = require("fs");
const path = require("path");

const bookingsPath = path.join(__dirname, "..", "data", "bookings.json");
const servicesPath = path.join(__dirname, "..", "data", "services.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function getBookings() {
  return readJson(bookingsPath);
}

function getServices() {
  return readJson(servicesPath);
}

function createBooking(payload) {
  const bookings = getBookings();
  const nextNumber = 1000 + bookings.length + 1;

  const booking = {
    id: `BK-${nextNumber}`,
    name: payload.name?.trim(),
    email: payload.email?.trim(),
    phone: payload.phone?.trim(),
    service: payload.service,
    date: payload.date,
    time: payload.time,
    message: payload.message?.trim() || "",
    status: "New",
    createdAt: new Date().toISOString()
  };

  bookings.unshift(booking);
  writeJson(bookingsPath, bookings);
  return booking;
}

function updateStatus(id, status) {
  const bookings = getBookings();
  const booking = bookings.find((item) => item.id === id);
  if (!booking) return null;
  booking.status = status;
  writeJson(bookingsPath, bookings);
  return booking;
}

function getBookingById(id) {
  return getBookings().find((item) => item.id === id);
}

function getStats(bookings = getBookings()) {
  return {
    total: bookings.length,
    newCount: bookings.filter((item) => item.status === "New").length,
    confirmedCount: bookings.filter((item) => item.status === "Confirmed").length,
    followUpCount: bookings.filter((item) => item.status === "Follow-up").length
  };
}

module.exports = {
  getBookings,
  getServices,
  createBooking,
  updateStatus,
  getBookingById,
  getStats
};
