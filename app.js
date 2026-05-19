const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const siteRoutes = require("./routes/site");
const adminRoutes = require("./routes/admin");
const moduleRoutes = require("./routes/modules");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", siteRoutes);
app.use("/admin", adminRoutes);
app.use("/modules", moduleRoutes);

app.use((req, res) => {
  res.status(404).render("not-found", { title: "Not Found" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`ASR Operational Systems Demo running on http://localhost:${PORT}`);
  });
}

module.exports = app;
