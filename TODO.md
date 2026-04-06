# Original State Restored - Local Fallback Active

All changes reverted. Current behavior:
- Cloudinary attempt → 403 fail → local `api/uploads/` fallback → Mongo URI `/uploads/filename`
- Works locally but disappears on Vercel redeploy (ephemeral FS)

**To Fix Disappearing Images PERMANENTLY:**
1. Fix Cloudinary 403: https://cloudinary.com/console → dkdhmgye1 → Regenerate API Key/Secret
2. Update `api/.env` & Vercel env vars
3. Test `cd api && npm start` → look for no 403 logs

Run `cd api && npm start` to confirm restoration.
