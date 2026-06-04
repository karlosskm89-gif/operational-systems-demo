const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");

const siteRoutes = require("./routes/site");
const adminRoutes = require("./routes/admin");
const moduleRoutes = require("./routes/modules");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use(helmet({
  contentSecurityPolicy: false,
}));

/*app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  //limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));
*/
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  const host = req.get("host") || "localhost:8000";
  const protocol = req.get("x-forwarded-proto") || req.protocol || "http";
  const origin = process.env.PUBLIC_SITE_URL || `${protocol}://${host}`;
  res.locals.canonicalUrl = `${origin}${req.path === "/" ? "/" : req.path}`;
  res.locals.csrfToken = req.cookies.asr_demo_csrf || crypto.randomBytes(32).toString("hex");
  res.cookie("asr_demo_csrf", res.locals.csrfToken, {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
  next();
});

function requireCsrf(req, res, next) {
  const cookieToken = req.cookies.asr_demo_csrf;
  const bodyToken = req.body._csrf;
  if (!cookieToken || !bodyToken || cookieToken !== bodyToken) {
    return res.status(403).render("not-found", { title: "Request blocked" });
  }
  next();
}

app.use((req, res, next) => {
  req.requireCsrf = requireCsrf;
  next();
});

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
