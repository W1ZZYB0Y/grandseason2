# Grand Seasons Hotel — Django Site

Converts the original static site (grandseason2) into a Django-powered
site so the hotel admin can:

- Update room prices without touching any code (Django admin, editable
  right from the list view).
- See visitor reviews. Reviews publish immediately; the admin can edit
  or delete (or temporarily hide via "is approved") any review.

## What's in here

- `config/` — Django project settings/urls.
- `hotel/` — the app: `Room`, `RoomImage`, `Review` models, views, forms,
  admin config.
- `templates/hotel/` — all site pages converted to Django templates,
  sharing one `base.html` (nav + footer).
- `static/` — the original CSS, JS, and images from the static site.
- `media/` — uploaded room images (created at runtime, admin-uploaded).

## 1. Set up Python environment

```bash
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 2. Set up PostgreSQL

Install PostgreSQL if you don't have it, then create a database and user:

```bash
sudo -u postgres psql -c "CREATE USER grandseasons WITH PASSWORD 'choose-a-password';"
sudo -u postgres psql -c "CREATE DATABASE grandseasons OWNER grandseasons;"
```

(On macOS with Homebrew, drop `sudo -u postgres` and just run `psql`.)

## 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your own values:

```bash
cp .env.example .env
```

```
SECRET_KEY=generate-a-long-random-string
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_NAME=grandseasons
DB_USER=grandseasons
DB_PASSWORD=choose-a-password
DB_HOST=localhost
DB_PORT=5432
```

Never commit `.env` to git — it's already in `.gitignore`.

## 4. Run migrations

This also seeds the 5 original rooms (Classic, Deluxe, Superior,
Executive Suite, Diplomatic Suite) with their original prices:

```bash
python manage.py migrate
```

## 5. Create an admin account

```bash
python manage.py createsuperuser
```

Follow the prompts for username/email/password.

## 6. Add room photos (optional, one-time)

The site will run fine without this — rooms just show a placeholder
image until you upload real ones. To attach photos to each room:

1. Go to `/admin/hotel/room/`, click a room.
2. Scroll to "Room images", click "Add another Room image", upload a
   photo, save. Add as many as you like — they'll rotate in that
   room's carousel.

## 7. Run the site locally

```bash
python manage.py runserver
```

Visit:
- **Public site**: http://127.0.0.1:8000/
- **Admin**: http://127.0.0.1:8000/admin/

## Day-to-day admin tasks

**Change a room price**: Admin → Hotel → Rooms. The price column is
editable directly in the list — change the number, click "Save" at
the bottom. No need to open each room individually.

**Edit or delete a review**: Admin → Hotel → Reviews. Click a review
to edit its text/rating, or select its checkbox and choose "Delete
selected reviews" from the Action dropdown. You can also untick
"Is approved" to hide a review from the public site without deleting
it (useful if you want to double-check something before removing it
permanently).

**Add a new room**: Admin → Hotel → Rooms → "Add room". Fill in name,
price, and amenities (one per line), then add images in the same form.

## Going to production later

Before deploying publicly:
- Set `DEBUG=False` and a real `SECRET_KEY` in your production `.env`.
- Set `ALLOWED_HOSTS` to your real domain(s).
- Run `python manage.py collectstatic` and serve `staticfiles/` and
  `media/` via your web server or a service like WhiteNoise/S3.
- Put PostgreSQL behind proper credentials/network rules, not the dev
  defaults used here.

You mentioned you haven't picked a host yet — when you're ready
(Railway, Render, a VPS, PythonAnywhere, etc.), let me know which one
and I can walk through the specific deployment steps for it.
