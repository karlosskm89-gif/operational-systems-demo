# Security Notes

This is a public-safe demo repository.

Do not commit:

- `.env`
- API keys
- email credentials
- real client data
- private admin credentials
- production database URLs
- private client source code

Use `.env.example` for placeholders only. Add real values only in your local machine or deployment provider environment settings.

If a secret is ever committed to GitHub, revoke/rotate it immediately and remove it from Git history before continuing.
