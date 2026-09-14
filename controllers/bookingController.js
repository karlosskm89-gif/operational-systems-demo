const fs = require("fs");
const path = require("path");

const bookingsPath = path.join(__dirname, "..", "data", "bookings.json");
const seedBookingsPath = path.join(__dirname, "..", "data", "bookings.seed.json");
const servicesPath = path.join(__dirname, "..", "data", "services.json");
const bookingOptionsPath = path.join(__dirname, "..", "data", "booking-options.json");

const ALLOWED_STATUSES = [
  "New",
  "Availability checked",
  "Confirmed",
  "Follow-up",
  "Completed",
  "Cancelled"
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function getOptions() {
  return readJson(bookingOptionsPath);
}

function getBookingTypes() {
  return getOptions().types;
}

function getBookingType(value) {
  return getBookingTypes().find((type) => type.value === value) || null;
}

function getServices() {
  return readJson(servicesPath);
}

function normaliseBooking(item) {
  // Keep older demo records readable after the vNext refit.
  if (!item.bookingType) {
    return {
      ...item,
      bookingType: "appointment",
      availabilityStatus: item.availabilityStatus || "Legacy sample record",
      conflictIds: Array.isArray(item.conflictIds) ? item.conflictIds : []
    };
  }

  return {
    ...item,
    conflictIds: Array.isArray(item.conflictIds) ? item.conflictIds : [],
    requirements: Array.isArray(item.requirements) ? item.requirements : []
  };
}

function getBookings() {
  return readJson(bookingsPath).map(normaliseBooking);
}

function cleanString(value, maxLength = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function toPositiveInteger(value, max = Number.MAX_SAFE_INTEGER) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= max ? parsed : null;
}

function normaliseRequirements(value) {
  const allowed = new Set(getOptions().requirements);
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return [...new Set(values.map((item) => cleanString(item, 120)).filter((item) => allowed.has(item)))];
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isValidTime(value) {
  return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value || "");
}

function isValidTimeRange(startTime, endTime) {
  return isValidTime(startTime) && isValidTime(endTime) && startTime < endTime;
}

function isValidEmail(value) {
  const email = cleanString(value, 200);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateBookingPayload(payload) {
  const errors = [];
  const type = getBookingType(payload.bookingType);
  const options = getOptions();
  const name = cleanString(payload.name, 120);
  const email = cleanString(payload.email, 200);

  if (!type) errors.push("Choose a booking or enquiry type");
  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  else if (!isValidEmail(email)) errors.push("Enter a valid email address");

  if (!type) return errors;

  if (type.value === "appointment") {
    const service = cleanString(payload.service, 120);
    const validServices = new Set(getServices().map((item) => item.name));
    if (!service) errors.push("Service is required");
    else if (!validServices.has(service)) errors.push("Choose a valid service");

    const date = cleanString(payload.date, 10);
    const time = cleanString(payload.time, 5);
    if (!date) errors.push("Date is required");
    else if (!isValidDate(date)) errors.push("Choose a valid date");
    if (!time) errors.push("Time is required");
    else if (!isValidTime(time)) errors.push("Choose a valid time");
  }

  if (type.value === "venue") {
    const resource = cleanString(payload.resource, 120);
    if (!resource) errors.push("Resource is required");
    else if (!options.resources.includes(resource)) errors.push("Choose a valid resource");

    const date = cleanString(payload.date, 10);
    const startTime = cleanString(payload.startTime, 5);
    const endTime = cleanString(payload.endTime, 5);
    if (!date) errors.push("Date is required");
    else if (!isValidDate(date)) errors.push("Choose a valid date");
    if (!startTime) errors.push("Start time is required");
    else if (!isValidTime(startTime)) errors.push("Choose a valid start time");
    if (!endTime) errors.push("End time is required");
    else if (!isValidTime(endTime)) errors.push("Choose a valid end time");
    if (isValidTime(startTime) && isValidTime(endTime) && !isValidTimeRange(startTime, endTime)) {
      errors.push("End time must be later than start time");
    }
    if (!toPositiveInteger(payload.attendees, 999)) errors.push("Expected attendees must be between 1 and 999");
  }

  if (type.value === "group") {
    const groupType = cleanString(payload.groupType, 120);
    if (!groupType) errors.push("Group type is required");
    else if (!options.groupTypes.includes(groupType)) errors.push("Choose a valid group type");

    const date = cleanString(payload.date, 10);
    const timeWindow = cleanString(payload.timeWindow, 40);
    if (!date) errors.push("Preferred date is required");
    else if (!isValidDate(date)) errors.push("Choose a valid preferred date");
    if (!timeWindow) errors.push("Preferred time window is required");
    else if (!options.timeWindows.includes(timeWindow)) errors.push("Choose a valid time window");
    if (!toPositiveInteger(payload.attendees, 999)) errors.push("Expected group size must be between 1 and 999");
  }

  if (type.value === "recurring") {
    if (!cleanString(payload.activity, 160)) errors.push("Activity is required");

    const resource = cleanString(payload.resource, 120);
    if (!resource) errors.push("Resource is required");
    else if (!options.resources.includes(resource)) errors.push("Choose a valid resource");

    const date = cleanString(payload.date, 10);
    const startTime = cleanString(payload.startTime, 5);
    const endTime = cleanString(payload.endTime, 5);
    if (!date) errors.push("First date is required");
    else if (!isValidDate(date)) errors.push("Choose a valid first date");
    if (!startTime) errors.push("Start time is required");
    else if (!isValidTime(startTime)) errors.push("Choose a valid start time");
    if (!endTime) errors.push("End time is required");
    else if (!isValidTime(endTime)) errors.push("Choose a valid end time");
    if (isValidTime(startTime) && isValidTime(endTime) && !isValidTimeRange(startTime, endTime)) {
      errors.push("End time must be later than start time");
    }

    const validRecurrences = new Set(options.recurrencePatterns.map((item) => item.value));
    if (!validRecurrences.has(payload.recurrence)) errors.push("Choose a recurrence pattern");

    const occurrences = toPositiveInteger(payload.occurrences, 12);
    if (!occurrences || !options.recurrenceCounts.includes(occurrences)) {
      errors.push("Choose how many occurrences to demonstrate");
    }

    if (!toPositiveInteger(payload.attendees, 999)) errors.push("Expected attendees must be between 1 and 999");
  }

  return errors;
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return dateString;
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function addMonths(dateString, months) {
  const source = new Date(`${dateString}T12:00:00Z`);
  if (Number.isNaN(source.getTime())) return dateString;

  const originalDay = source.getUTCDate();
  source.setUTCDate(1);
  source.setUTCMonth(source.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(source.getUTCFullYear(), source.getUTCMonth() + 1, 0)).getUTCDate();
  source.setUTCDate(Math.min(originalDay, lastDay));
  return source.toISOString().slice(0, 10);
}

function getOccurrenceDates(booking) {
  if (!booking.date) return [];
  if (booking.bookingType !== "recurring") return [booking.date];

  const count = Math.min(Math.max(toPositiveInteger(booking.occurrences) || 1, 1), 12);
  const dates = [];

  for (let index = 0; index < count; index += 1) {
    if (booking.recurrence === "fortnightly") dates.push(addDays(booking.date, index * 14));
    else if (booking.recurrence === "monthly") dates.push(addMonths(booking.date, index));
    else dates.push(addDays(booking.date, index * 7));
  }

  return dates;
}

function intervalsOverlap(startA, endA, startB, endB) {
  return Boolean(startA && endA && startB && endB && startA < endB && startB < endA);
}

function findResourceConflicts(candidate, bookings = getBookings()) {
  if (!["venue", "recurring"].includes(candidate.bookingType) || !candidate.resource) return [];

  const candidateDates = new Set(getOccurrenceDates(candidate));
  const conflicts = [];

  bookings.forEach((existing) => {
    if (candidate.id && existing.id === candidate.id) return;
    if (existing.status === "Cancelled") return;
    if (!["venue", "recurring"].includes(existing.bookingType)) return;
    if (existing.resource !== candidate.resource) return;
    if (!intervalsOverlap(candidate.startTime, candidate.endTime, existing.startTime, existing.endTime)) return;

    const matchingDate = getOccurrenceDates(existing).some((date) => candidateDates.has(date));
    if (matchingDate) conflicts.push(existing.id);
  });

  return [...new Set(conflicts)];
}

function nextBookingId(bookings) {
  const highest = bookings.reduce((max, item) => {
    const match = String(item.id || "").match(/BK-(\d+)/);
    return match ? Math.max(max, Number.parseInt(match[1], 10)) : max;
  }, 1000);
  return `BK-${highest + 1}`;
}

function buildBooking(payload) {
  const bookingType = payload.bookingType;
  const base = {
    bookingType,
    name: cleanString(payload.name, 120),
    email: cleanString(payload.email, 200),
    phone: cleanString(payload.phone, 60),
    message: cleanString(payload.message, 2000),
    status: "New",
    requirements: normaliseRequirements(payload.requirements),
    createdAt: new Date().toISOString()
  };

  if (bookingType === "appointment") {
    return {
      ...base,
      service: cleanString(payload.service, 120),
      date: cleanString(payload.date, 10),
      time: cleanString(payload.time, 5)
    };
  }

  if (bookingType === "venue") {
    return {
      ...base,
      resource: cleanString(payload.resource, 120),
      date: cleanString(payload.date, 10),
      startTime: cleanString(payload.startTime, 5),
      endTime: cleanString(payload.endTime, 5),
      attendees: toPositiveInteger(payload.attendees, 999)
    };
  }

  if (bookingType === "group") {
    return {
      ...base,
      groupType: cleanString(payload.groupType, 120),
      date: cleanString(payload.date, 10),
      timeWindow: cleanString(payload.timeWindow, 40),
      attendees: toPositiveInteger(payload.attendees, 999)
    };
  }

  return {
    ...base,
    activity: cleanString(payload.activity, 160),
    resource: cleanString(payload.resource, 120),
    date: cleanString(payload.date, 10),
    startTime: cleanString(payload.startTime, 5),
    endTime: cleanString(payload.endTime, 5),
    recurrence: cleanString(payload.recurrence, 20),
    occurrences: toPositiveInteger(payload.occurrences, 12),
    attendees: toPositiveInteger(payload.attendees, 999)
  };
}

function createBooking(payload) {
  const bookings = getBookings();
  const booking = buildBooking(payload);
  booking.id = nextBookingId(bookings);

  const conflicts = findResourceConflicts(booking, bookings);
  booking.conflictIds = conflicts;

  if (booking.bookingType === "venue") {
    booking.availabilityStatus = conflicts.length ? "Potential clash" : "No sample clash found";
  } else if (booking.bookingType === "recurring") {
    booking.availabilityStatus = conflicts.length
      ? "Potential clash across recurrence"
      : "No sample clash found across recurrence";
  } else if (booking.bookingType === "group") {
    booking.availabilityStatus = "Staff review required";
  } else {
    booking.availabilityStatus = "Pending staff review";
  }

  bookings.unshift(booking);
  writeJson(bookingsPath, bookings);
  return booking;
}

function updateStatus(id, status) {
  if (!ALLOWED_STATUSES.includes(status)) return null;

  const bookings = getBookings();
  const booking = bookings.find((item) => item.id === id);
  if (!booking) return null;

  booking.status = status;
  writeJson(bookingsPath, bookings);
  return booking;
}

function resetDemoBookings() {
  const seedBookings = readJson(seedBookingsPath);
  writeJson(bookingsPath, seedBookings);
  return seedBookings.map(normaliseBooking);
}

function getBookingById(id) {
  return getBookings().find((item) => item.id === id);
}

function getStats(bookings = getBookings()) {
  return {
    total: bookings.length,
    newCount: bookings.filter((item) => item.status === "New").length,
    confirmedCount: bookings.filter((item) => item.status === "Confirmed").length,
    actionCount: bookings.filter((item) => ["New", "Availability checked", "Follow-up"].includes(item.status)).length,
    typeCount: new Set(bookings.map((item) => item.bookingType)).size
  };
}

function getTypeLabel(booking) {
  return getBookingType(booking.bookingType)?.label || "Appointment / Service";
}

function getSubject(booking) {
  if (booking.bookingType === "appointment") return booking.service || "Appointment";
  if (booking.bookingType === "venue") return booking.resource || "Resource request";
  if (booking.bookingType === "group") return booking.groupType || "Group visit";
  if (booking.bookingType === "recurring") return booking.activity || booking.resource || "Recurring booking";
  return "Booking request";
}

function getSchedule(booking) {
  if (booking.bookingType === "appointment") return `${booking.date || "—"} at ${booking.time || "—"}`;
  if (booking.bookingType === "venue") return `${booking.date || "—"}, ${booking.startTime || "—"}–${booking.endTime || "—"}`;
  if (booking.bookingType === "group") return `${booking.date || "—"} · ${booking.timeWindow || "Time to agree"}`;
  if (booking.bookingType === "recurring") {
    const recurrence = getOptions().recurrencePatterns.find((item) => item.value === booking.recurrence)?.label || "Recurring";
    return `${booking.date || "—"}, ${booking.startTime || "—"}–${booking.endTime || "—"} · ${recurrence} × ${booking.occurrences || "—"}`;
  }
  return booking.date || "—";
}

function toViewModel(booking) {
  return {
    ...booking,
    typeLabel: getTypeLabel(booking),
    subject: getSubject(booking),
    schedule: getSchedule(booking),
    requirementsText: booking.requirements?.length ? booking.requirements.join(", ") : "None specified",
    occurrenceDates: getOccurrenceDates(booking)
  };
}

module.exports = {
  ALLOWED_STATUSES,
  getBookings,
  getServices,
  getOptions,
  getBookingTypes,
  getBookingType,
  createBooking,
  validateBookingPayload,
  updateStatus,
  getBookingById,
  resetDemoBookings,
  getStats,
  getOccurrenceDates,
  findResourceConflicts,
  toViewModel
};
