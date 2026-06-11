# Publish Checklist

Use this before pushing or deploying this demo.

## Repository hygiene

- [ ] `.env` is not present in the repo.
- [ ] `.env.example` is present and contains placeholders only.
- [ ] `node_modules/` is not present.
- [ ] `.git/` from any local/private working copy is not included in exported zips.
- [ ] `npm install` runs cleanly from `package-lock.json`.
- [ ] `npm test` passes.
- [ ] README live demo URL is correct, or clearly marked as pending.
- [ ] Screenshots are added to the README or `/docs` if desired.

## Deployment

- [ ] Environment variables are added only inside the deployment provider.
- [ ] Health check route works after deploy.
- [ ] Contact/email settings are either disabled for demo use or configured with a fresh key.
- [ ] Public pages use demo-safe data only.

## ASR website alignment

- [ ] Add this demo to the ASR portfolio/demos area.
- [ ] Update ASR services copy to mention websites, booking/enquiry flows, admin dashboards, content/news systems, exports, and maintenance.
- [ ] Cross-link this demo, the companion repo, and the relevant case studies.
