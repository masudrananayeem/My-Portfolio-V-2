# MRN Portfolio CMS setup

## What is now managed from Admin

- Profile: hero identity, roles, bio, education, resume URL, and profile image upload.
- About: title, intro, long-form details, highlights.
- Experience: timeline entries.
- Certificates: certificate image upload, issuer, date, credential, verification URL and description.
- Skills / Tech Stack.
- Projects: cover image upload, GitHub URL, live URL, technologies, features and full project details.
- Research: two-column public cards, cover image upload, abstract, summary, dataset, methodology, models, results and paper URL.
- Articles: three-column public cards, cover image upload, excerpt, full article, category, reading time, publication date and status.
- GitHub settings.
- Messages, Media, Resume and Site Settings.

## Cloudinary image uploads

The Admin app uses Cloudinary unsigned uploads for PNG/JPG/JPEG images.

Create `Frontend/apps/admin/.env` from `.env.example` and set:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

In Cloudinary, create an **unsigned upload preset** and allow image uploads. The frontend only receives the Cloudinary `secure_url` and `public_id`; no Cloudinary API secret is placed in the browser.

## Firestore

Deploy the updated rules after adding the new collections:

```powershell
cd Frontend
firebase deploy --only firestore:rules
```

The new collections are:

- `articles`
- `certificates`

## Public layout

- Projects: 3 cards per row on large screens.
- Research: 2 paper cards per row on medium/large screens.
- Articles: 3 cards per row on large screens.
- About: full About details + Experience timeline + Certificates.
- Services has been removed from the public navigation and replaced by Articles.


## Admin / Cloudinary troubleshooting

If an admin collection page reports `Function collection() cannot be called with an empty path`, restart the Vite admin server after pulling the updated source. The CMS now validates collection paths and shows a friendly error instead of crashing.

For image uploads, the browser uploader uses Cloudinary unsigned uploads. The upload preset configured in `apps/admin/.env` must have **Signing Mode = Unsigned**.

Admin access requires the signed-in Firebase Auth UID to exist as `admins/<UID>` in Firestore. Firestore rules remain the actual security boundary.
