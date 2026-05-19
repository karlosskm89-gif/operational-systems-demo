const fs = require("fs");
const path = require("path");

const recordsPath = path.join(__dirname, "..", "data", "records.json");
const invoicesPath = path.join(__dirname, "..", "data", "invoices.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getRecords() {
  return readJson(recordsPath);
}

function getRecordById(id) {
  return getRecords().find((record) => record.id === id);
}

function getInvoices() {
  return readJson(invoicesPath);
}

function getInvoiceById(id) {
  return getInvoices().find((invoice) => invoice.id === id);
}

function getModuleStats() {
  const records = getRecords();
  const invoices = getInvoices();

  return {
    recordsTotal: records.length,
    recordsActive: records.filter((record) => record.status === "Active").length,
    invoicesTotal: invoices.length,
    invoicesPaid: invoices.filter((invoice) => invoice.status === "Paid").length,
    invoicesOpen: invoices.filter((invoice) => invoice.status !== "Paid").length
  };
}

module.exports = {
  getRecords,
  getRecordById,
  getInvoices,
  getInvoiceById,
  getModuleStats
};
