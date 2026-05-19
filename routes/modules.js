const express = require("express");
const router = express.Router();
const operationalController = require("../controllers/operationalController");

router.get("/", (req, res) => {
  res.render("modules/index", {
    title: "Operational Modules",
    stats: operationalController.getModuleStats()
  });
});

router.get("/records", (req, res) => {
  res.render("modules/records", {
    title: "Records Module",
    records: operationalController.getRecords()
  });
});

router.get("/records/:id", (req, res) => {
  const record = operationalController.getRecordById(req.params.id);
  if (!record) return res.status(404).render("not-found", { title: "Not Found" });

  res.render("modules/record-detail", {
    title: record.id,
    record
  });
});

router.get("/invoices", (req, res) => {
  res.render("modules/invoices", {
    title: "Invoice Workflow",
    invoices: operationalController.getInvoices()
  });
});

router.get("/invoices/:id", (req, res) => {
  const invoice = operationalController.getInvoiceById(req.params.id);
  if (!invoice) return res.status(404).render("not-found", { title: "Not Found" });

  res.render("modules/invoice-detail", {
    title: invoice.id,
    invoice
  });
});

router.get("/invoices-export.csv", (req, res) => {
  const rows = operationalController.getInvoices();
  const header = ["id", "client", "service", "amount", "status", "issued", "due"];
  const csv = [
    header.join(","),
    ...rows.map((row) => header.map((field) => `"${String(row[field] || "").replaceAll('"', '""')}"`).join(","))
  ].join("\n");

  res.header("Content-Type", "text/csv");
  res.attachment("operational-invoices-demo-export.csv");
  res.send(csv);
});

module.exports = router;
