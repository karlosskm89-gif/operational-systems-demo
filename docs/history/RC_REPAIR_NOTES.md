# RC Repair Notes — ASR Operational Systems Demo

Applied June 2026:

- Added Helmet security headers.
- Added global rate limiting.
- Added lightweight double-submit CSRF protection for booking/admin POST routes.
- Added visible public-demo admin notices.
- Added dynamic canonical/OG URLs based on current request path, with PUBLIC_SITE_URL override support.
- Added compressed WebP ASR brand assets and updated templates/docs to use them.
- Re-ran tests, route smoke checks, and production dependency audit.

Validation:

- npm test: passing
- npm audit --omit=dev: 0 vulnerabilities
- Route smoke: main public/admin routes return expected 200/302/404 statuses


## Deep regression repair pass

- Removed unused heavyweight PNG logo sources from the release package.
- Regenerated a compact favicon.
- Recompressed ASR WebP brand assets.
- Slimmed README/docs so the public repo reads as release support, not an internal archive.
- Added public-demo reset support and clearer admin mutation wording.

## Final RC hygiene repair pass

- Consolidated header/footer CSS so ecosystem alignment styles are no longer appended as a duplicate patch block.
- Documented the `/admin/export.csv` sample CSV route more explicitly.
- Preserved existing runtime behaviour and test coverage.

