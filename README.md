# Bull Gym

Bull Gym is a static fitness website with a Firebase-backed gym management
portal. It provides public pages for the gym brand, Firebase authentication,
an admin dashboard, and a member portal with wellness features.

## Features

- Public gym website:
  - Home, About, Courses, Pricing, Gallery, Blog, and Contact pages
  - Responsive navigation and mobile layout
  - Local CSS, JavaScript, image, and font assets
- Authentication:
  - Firebase email/password sign-up and sign-in
  - Automatic role-based routing
  - Logout and authentication-state checks
- Admin dashboard:
  - Member, coach, and receptionist management
  - Dashboard metrics and recent members
  - Firestore add and delete operations
- Member portal:
  - Membership and renewal information
  - Class schedule and payment history sections
  - Diet-plan selector for maintenance, muscle gain, and fat loss
  - Current weather from the keyless Open-Meteo API
- Performance and accessibility:
  - Lazy-loaded public-page images
  - Responsive layouts
  - Reduced-motion support
  - No build step or npm dependency required

## Requirements

- A modern browser
- Python 3 (recommended) or another local static HTTP server
- A Firebase project with:
  - Email/password Authentication enabled
  - Cloud Firestore enabled
  - Firestore rules configured for your deployment

The site must be served over HTTP rather than opened directly with
`file://`. This avoids browser restrictions around Firebase and other
network requests.

## Initialize the project

Clone the repository and enter its directory:

```bash
git clone https://github.com/01-anupkr/Bull-Space---Fitness-Tracking-Web-Application.git
cd Bull-Space---Fitness-Tracking-Web-Application
```

No package installation is required. The repository already contains the
frontend libraries and static assets under `assets/` and `img/`.

## Start locally

Using Python's built-in server:

```bash
python3 -m http.server 8000
```

Open the public website:

```text
http://localhost:8000/index1.html
```

Useful routes:

| Route | Purpose |
| --- | --- |
| `/index1.html` | Public gym homepage |
| `/about.html` | About page |
| `/courses.html` | Training programs |
| `/pricing.html` | Membership pricing |
| `/gallery.html` | Gym gallery |
| `/blog.html` | Blog listing |
| `/contact.html` | Contact page |
| `/login.html` | Firebase login |
| `/signup.html` | Create a member account |
| `/index.html` | Authenticated admin dashboard |
| `/member_panel.html` | Authenticated member portal |

Stop the server with `Ctrl+C`.

## Firebase initialization

Firebase configuration is currently declared in the authentication pages and
the admin/member pages:

- `login.html`
- `signup.html`
- `index.html`
- `member_panel.html`

For a new Firebase project, replace the `firebaseConfig` values in those
files with the web app configuration from Firebase Console. Keep the
configuration consistent across all four pages.

Firebase web configuration values identify a project but do not replace
Firestore security rules. Do not put administrator passwords, service-account
keys, or other private credentials in HTML or JavaScript.

### Enable Authentication

1. Open Firebase Console for the project.
2. Go to **Authentication → Sign-in method**.
3. Enable **Email/Password**.
4. Create an administrator account and any test member accounts.

### Configure administrator access

New sign-ups are assigned the `member` role automatically. To grant admin
access, create a Firestore document in `user_roles`:

- **Document ID:** the Firebase Authentication user's UID
- **Fields:**

```json
{
  "email": "admin@example.com",
  "role": "admin"
}
```

Only assign the `admin` role to trusted accounts. In production, enforce
authorization with Firestore Security Rules and, where appropriate, custom
claims rather than relying only on client-side routing.

## Firestore collections

The current frontend expects these collections:

### `user_roles`

```json
{
  "email": "member@example.com",
  "role": "member"
}
```

Valid roles used by the client are `member` and `admin`.

### `members`

Typical fields:

```json
{
  "name": "Example Member",
  "email": "member@example.com",
  "membership": "Annual",
  "status": "Active",
  "expiry_date": "2027-10-26",
  "created_at": "Firestore server timestamp"
}
```

### `coaches`

Typical fields:

```json
{
  "name": "Example Coach",
  "specialization": "Strength Training",
  "email": "coach@example.com",
  "status": "Active",
  "created_at": "Firestore server timestamp"
}
```

### `receptionists`

Typical fields:

```json
{
  "name": "Example Receptionist",
  "shift": "Morning",
  "email": "reception@example.com",
  "status": "Active",
  "created_at": "Firestore server timestamp"
}
```

The member portal also reads schedule and payment data when those sections
are populated in the project database.

## Weather feature

The member portal uses Open-Meteo:

```text
https://api.open-meteo.com
```

No API key is required. The browser requests the member's location when
permission is granted and falls back to the gym's configured default
coordinates when permission is denied.

## Project structure

```text
.
├── index1.html              # Public homepage
├── about.html               # Public pages
├── courses.html
├── pricing.html
├── gallery.html
├── blog.html
├── blog_details.html
├── contact.html
├── elements.html
├── login.html               # Firebase login
├── signup.html              # Firebase registration
├── index.html               # Admin dashboard
├── member_panel.html        # Member portal
├── style.css                # Admin/dashboard styles
├── script.js                # Admin navigation and Firestore operations
├── assets/                  # Public CSS, JavaScript, fonts, and images
└── img/                     # Project-level images and logo
```

## Troubleshooting

### The page is blank or assets do not load

Start a local HTTP server and use `http://localhost:8000/...`; do not open
the HTML file directly from Finder.

### Login fails

Check that Email/Password authentication is enabled, the Firebase config
matches the project, and the browser console does not show a Firebase error.

### A member is redirected to the member portal

This is expected unless that Firebase user's UID has a `user_roles` document
whose `role` is exactly `admin`.

### Firestore permission errors appear

Review the Firestore Security Rules and make sure they allow the intended
authenticated reads and writes. Do not solve permission errors by publishing
unrestricted database rules.

## Security notes

- Never commit passwords or service-account credentials.
- Reset credentials that have been exposed.
- Restrict Firestore reads and writes with Security Rules.
- Treat client-side role routing as a UI convenience, not a security boundary.
- Use HTTPS when deploying outside local development.

## License

See [LICENSE](./LICENSE).
