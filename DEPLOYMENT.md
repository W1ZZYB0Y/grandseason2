# Deploying to Render (free) + Neon (free Postgres)

This is the $0-floor, pay-as-you-go setup: Render hosts the Django app for
free (it sleeps after 15 minutes idle, waking in ~30–50s on the next
visit), and Neon hosts a permanent free PostgreSQL database.

## Before you start

Push this project to a GitHub repository — Render deploys from Git.

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/W1ZZYB0Y/<your-repo-name>.git
git push -u origin main
```

(`.env` is already in `.gitignore` — never commit real secrets.)

## 1. Create the database on Neon

1. Sign up at neon.com (no card required for the free tier).
2. Create a project. Note the **connection string** shown — it looks like
   `postgresql://user:password@ep-xxxx.region.aws.neon.tech/dbname?sslmode=require`.
   Use the **pooled** connection string if Neon shows you both a direct
   and pooled option.
3. Keep this tab open — you'll paste this into Render next.

## 2. Create the web service on Render

1. Sign up at render.com and connect your GitHub account.
2. New → Web Service → pick this repository.
3. Settings:
   - **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
   - **Start Command**: `gunicorn config.wsgi`
   - **Instance Type**: Free
4. Under **Environment**, add these variables (see `.env.render.example`
   for the full list):
   - `SECRET_KEY` — generate one: `python -c "import secrets; print(secrets.token_urlsafe(50))"`
   - `DEBUG` = `False`
   - `ALLOWED_HOSTS` = your domain(s), comma-separated (add `.onrender.com`
     too while testing before your domain is pointed here)
   - `DATABASE_URL` = the Neon connection string from step 1
5. Click **Create Web Service**. Render will build and deploy — first
   deploy takes a few minutes.

## 3. Create your admin account

Render's dashboard gives you a **Shell** tab for the running service.
Open it and run:

```bash
python manage.py createsuperuser
```

## 4. Point your domain at Render (once ready)

In Render: Settings → Custom Domain → add `grandseasonshotel.ng` and
`www.grandseasonshotel.ng`, then follow Render's instructions to update
your domain's DNS records with your domain registrar. Render issues a
free SSL certificate automatically once DNS resolves.

Update the `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS` environment
variables on Render to include the real domain once it's live.

## Important: room/review photos and the free tier

Render's free tier storage is **ephemeral** — any file saved to disk
(e.g. a room photo uploaded through `/admin/`) is wiped on every redeploy
or when the service restarts after sleeping. The rooms seeded via the
`0003_seed_room_images` migration ship as part of the code, so those are
safe. But **new photos uploaded through the admin after deployment will
eventually disappear.**

This is fine for launching today. When you're ready to let the hotel
admin upload their own room photos reliably, the fix is to point Django's
file storage at a free persistent host like Cloudinary instead of local
disk — that's a small, separate change (a new `DEFAULT_FILE_STORAGE`
setting + a Cloudinary account) and I can set that up whenever you want it.

## Ongoing costs

- Render free web service: $0/month, sleeps after 15 min idle.
- Neon free Postgres: $0/month, permanent tier (3 GB storage, more than
  enough here), may briefly pause on inactivity like the web service.
- Total at ~100 visits/day: **$0/month**, with the tradeoff being a slow
  (~30–50s) first load after a quiet period.
