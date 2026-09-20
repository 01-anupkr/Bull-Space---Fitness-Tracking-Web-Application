# Bull-Space---Fitness-Tracking-Web-Application
🏋️ Fitness Tracker & Gym Management System

A responsive Fitness Tracker / Gym Management System built with HTML, CSS and JavaScript, with Firebase Authentication and Cloud Firestore for user authentication and gym-management data.

The project contains two major parts:

Public Fitness Website – home page, about, courses, pricing, gallery, blog and contact pages.

Authenticated Management Portal – login/sign-up, role-based routing, admin/staff dashboard and member portal.

Note: The repository should include the assets/ and img/ directories referenced by the HTML pages. The uploaded source files contain references to these folders, but those asset directories were not included in the supplied files.

✨ Features

🌐 Public Website

Fitness/gym landing page

About section

Courses and training information

Pricing plans

Gallery

Blog listing

Blog details

Contact page

Responsive navigation

Mobile navigation support

Preloader and UI animations

Bootstrap-based responsive components

The public pages share a common navigation structure linking Home, About, Courses, Pricing, Gallery, Blog and Contact pages.

🔐 Authentication

Firebase Authentication is used for:

User registration

User login

Authentication-state checking

Logout

Role-based redirection

The application checks the user_roles Firestore collection and routes users according to their role.

👨‍💼 Admin / Staff Dashboard

The management dashboard provides:

Dashboard metrics

Total members

Active coaches

Receptionist count

Pending payments

Recent members

Members management

Coaches management

Receptionists management

Add/update/delete Firestore records

Logout

👤 Member Portal

Authenticated members can access a dedicated member portal and view member-specific information stored in Firestore.

🧰 Tech Stack

Technology

Purpose

HTML5

Page structure

CSS3

Styling and responsive UI

JavaScript

Client-side functionality

Bootstrap

Responsive UI components

Firebase Authentication

User authentication

Firebase Firestore

Cloud database

Font Awesome

Icons

Themify Icons

Icons

Owl Carousel

Sliders/carousels

Slick / SlickNav

UI sliders and responsive navigation

Magnific Popup

Popup/media functionality

Google Fonts

Typography

The source pages load several frontend libraries through local assets/css files and external Firebase/CDN resources.

📁 Project Structure

fitness-tracker/
│
├── README.md
│
├── index1.html                 # Public website / main landing page
├── about.html                  # About page
├── courses.html                # Courses / training page
├── pricing.html                # Pricing plans
├── gallery.html                # Fitness gallery
├── blog.html                   # Blog listing
├── blog_details.html           # Individual blog details
├── contact.html                # Contact page
├── elements.html               # UI/design elements page
│
├── login.html                  # Firebase login page
├── signup.html                 # Firebase registration page
├── index.html                  # Authenticated admin/staff dashboard
├── member_panel.html           # Authenticated member portal
│
├── style.css                   # Dashboard/global custom styles
├── script.js                   # Dashboard navigation + Firestore operations
│
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   ├── owl.carousel.min.css
│   │   ├── slicknav.css
│   │   ├── flaticon.css
│   │   ├── gijgo.css
│   │   ├── animate.min.css
│   │   ├── animated-headline.css
│   │   ├── magnific-popup.css
│   │   ├── fontawesome-all.min.css
│   │   ├── themify-icons.css
│   │   ├── slick.css
│   │   ├── nice-select.css
│   │   ├── style.css
│   │   └── responsive.css
│   │
│   ├── js/
│   │   └── ...                  # Frontend plugin JavaScript files
│   │
│   └── img/
│       ├── hero/
│       ├── gallery/
│       ├── logo/
│       └── ...                  # Project images
│
├── img/
│   └── TT.png                   # Project logo referenced by pages
│
└── docs/
    └── screenshots/
        ├── home.png
        ├── about.png
        ├── courses.png
        ├── pricing.png
        ├── gallery.png
        ├── blog.png
        ├── contact.png
        ├── login.png
        ├── signup.png
        ├── admin-dashboard.png
        └── member-portal.png

🗺️ Application Flow

                         ┌─────────────────────┐
                         │  Public Website     │
                         │    index1.html      │
                         └──────────┬──────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
              Courses           Pricing            Gallery
                  │
                  └─────────────────┬─────────────────┘
                                    │
                                    ▼
                              Login / Sign Up
                              login.html
                              signup.html
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Firebase Auth        │
                         │ + user_roles         │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
              role = admin                     role = member
                    │                               │
                    ▼                               ▼
          ┌───────────────────┐           ┌──────────────────┐
          │ Admin Dashboard   │           │ Member Portal    │
          │   index.html      │           │ member_panel.html│
          └─────────┬─────────┘           └──────────────────┘
                    │
       ┌────────────┼───────────────┐
       ▼            ▼               ▼
    Members      Coaches       Receptionists
       │            │               │
       └────────────┼───────────────┘
                    ▼
              Cloud Firestore

🔥 Firebase Architecture

The project uses Firebase Authentication and Cloud Firestore.

Authentication

User
 │
 ├── Sign Up
 │      ↓
 │   Firebase Authentication
 │      ↓
 │   user_roles/{uid}
 │
 └── Login
        ↓
   Check authenticated user
        ↓
   Read role from Firestore
        │
        ├── admin → index.html
        │
        └── member → member_panel.html

Firestore Collections

The dashboard JavaScript works with the following collections:

Firestore
│
├── user_roles
│   └── {uid}
│       └── role
│
├── members
│   ├── name
│   ├── email
│   ├── membership
│   ├── status
│   └── created_at
│
├── coaches
│   └── coach records
│
└── receptionists
    └── receptionist records

The dashboard reads member, coach and receptionist collections to populate metrics and tables.

🔐 Role-Based Access

The login and registration pages check the user's role from the user_roles Firestore collection.

                    Login
                      │
                      ▼
              Firebase Auth
                      │
                      ▼
             Read user_roles
                      │
             ┌────────┴────────┐
             │                 │
           admin             member
             │                 │
             ▼                 ▼
       index.html       member_panel.html

📊 Admin Dashboard

The admin dashboard contains four main navigation areas:

Dashboard
│
├── 🏠 Dashboard
│   ├── Total Members
│   ├── Active Coaches
│   ├── Receptionists
│   └── Pending Payments
│
├── 👥 Members
│
├── 🏋️ Coaches
│
└── 👩‍💼 Reception

Dashboard data is retrieved from Firestore using script.js.



🚀 Getting Started

1. Clone the repository

git clone https://github.com/<your-username>/<your-repository>.git
cd <your-repository>

2. Verify project assets

Make sure the following directories exist:

assets/
img/

The HTML pages reference files such as:

assets/css/style.css
assets/css/bootstrap.min.css
assets/img/favicon.ico
img/TT.png

3. Configure Firebase

Create/configure a Firebase project with:

Firebase Authentication

Email/Password authentication

Cloud Firestore

Configure Firestore collections:

user_roles
members
coaches
receptionists

4. Run the project

Because Firebase and browser security rules may behave differently with file://, use a local web server.

Option 1 — VS Code Live Server

Install the Live Server extension and open:

index1.html

Then click Go Live.

Option 2 — Python

python3 -m http.server 5500

Open:

http://localhost:5500/index1.html

🔑 Firebase Configuration

The supplied source currently contains Firebase web configuration directly in the HTML files.

For a production repository, prefer environment/configuration management appropriate to your deployment and make sure Firestore Security Rules and Authentication settings prevent unauthorized access.

Do not commit:

Service-account private keys

Firebase Admin SDK credentials

Server-side secrets

Database passwords

API tokens that are actually secret

A Firebase web API key by itself is not a database authorization mechanism; access should be protected by Firebase Authentication and Firestore Security Rules.

🧪 Testing Checklist

Before publishing the repository, test:

[ ] Home page loads
[ ] Navigation links work
[ ] About page works
[ ] Courses page works
[ ] Pricing page works
[ ] Gallery works
[ ] Blog works
[ ] Blog details works
[ ] Contact page works
[ ] Sign-up works
[ ] Login works
[ ] Invalid login shows an error
[ ] Admin role redirects to dashboard
[ ] Member role redirects to member portal
[ ] Logout works
[ ] Members load from Firestore
[ ] Coaches load from Firestore
[ ] Receptionists load from Firestore
[ ] Dashboard metrics load correctly
[ ] Add record works
[ ] Update record works
[ ] Delete record works
[ ] Mobile layout works

📱 Responsive Design

The public website uses responsive navigation and frontend libraries for desktop/mobile layouts.

The pages include responsive navigation elements and Bootstrap-based components. The dashboard also uses a responsive grid for metric cards.

🛠️ Main Source Files

index1.html

Public-facing Fitness Tracker home page and main navigation entry point.

index.html

Authenticated Gym Management Dashboard.

login.html

Firebase Authentication login page and role-based routing.

signup.html

New member/user registration page.

member_panel.html

Authenticated member portal.

script.js

Dashboard navigation and Firestore CRUD/data-loading logic.

style.css

Custom dashboard styling, layout, navigation, metric cards and tables.

📌 Important Implementation Notes

Some supplied HTML pages contain references to backend PHP endpoints such as:

admin-login.php
admin-index.php

Those PHP files were not included in the supplied source set. If those links are no longer part of the application, they should be removed or replaced with the Firebase-based authentication flow.

The current Firebase-based authentication flow uses:

login.html
signup.html
index.html
member_panel.html

Also verify all referenced pages/assets before deployment because the supplied HTML contains references to shared assets/, img/, and other frontend resources.

🌍 Deployment

This project can be deployed as a static frontend using services such as:

GitHub Pages

Netlify

Vercel

Firebase Hosting

For Firebase-backed functionality, configure the deployed domain in Firebase Authentication's authorized domains and configure Firestore Security Rules appropriately.

📈 Future Improvements

Possible improvements include:

Member attendance tracking

Workout-plan management

Trainer assignment

Subscription renewal reminders

Online payment integration

Membership expiry notifications

BMI/fitness calculator

Progress tracking

Admin analytics and charts

Profile management

Password reset

Firestore Security Rules refinement

Better form validation

Backend/API layer for sensitive operations

Automated deployment using GitHub Actions

👨‍💻 Author

Anup Kumar

B.Tech – Computer Science (IoT)

📄 License

This project can be distributed and modified according to the license selected for the repository.

If no license has been selected yet, add an appropriate LICENSE file before treating the project as an open-source project.

⭐ Project Summary

Fitness Tracker & Gym Management System is a web-based gym management application combining a responsive fitness website with Firebase-powered authentication, role-based access and a Firestore-backed administration dashboard.

Frontend
   ↓
HTML + CSS + JavaScript
   ↓
Firebase Authentication
   ↓
Role-Based Routing
   ↓
Admin Dashboard / Member Portal
   ↓
Cloud Firestore

If you find the project useful, consider giving the repository a ⭐.
