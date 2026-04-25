# HomeCare360

> A full-stack home care services marketplace connecting homeowners with trusted service providers.

**Live:** [https://homecare360.netlify.app](https://homecare360.netlify.app)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Role-Based Access](#role-based-access)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Admin Panel](#admin-panel)
- [Pages & Routes](#pages--routes)

---

## Overview

HomeCare360 is a marketplace platform where users can browse home care services, book service providers, and track their appointments. Service providers can apply to join the platform and manage their bookings through a dedicated provider dashboard. Admins and super admins have full control over the platform through a comprehensive admin panel.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| React Router v6 | Client-side routing |
| Framer Motion | Animations & transitions |
| Lucide React | Icon library |
| React Context API | Global state (auth/user) |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens (JWT) | Authentication |
| bcryptjs | Password hashing |

### Deployment
| Service | Purpose |
|---|---|
| Netlify | Frontend hosting |
| (Backend) | Node.js API server |

---

## Features

### For Users
- **Browse Services** — Explore available home care services with filtering and search
- **View Provider Profiles** — See provider details, ratings, and reviews before booking
- **Book Services** — Schedule appointments with preferred service providers
- **My Bookings** — View and manage all past and upcoming bookings
- **Instant Quote Estimator** — Get an estimated cost before booking
- **User Authentication** — Register, login, and forgot password flows

### For Providers
- **Become a Provider** — Apply to join the platform as a service provider
- **Provider Dashboard** — Dedicated portal showing only their bookings and reviews
- **Manage Bookings** — View and update booking statuses
- **Reviews & Ratings** — See customer feedback on their services

### For Admins / Super Admins
- **Admin Dashboard** — Overview of platform stats and activity
- **Services Management** — Create, edit, and manage service categories
- **Service Providers** — View and manage all registered providers
- **Provider Applications** — Review and approve/reject provider applications
- **User Management** — View and manage all registered users
- **Booking Management** — Oversee all bookings across the platform
- **Payments & Escrow** — Monitor transactions and payment statuses
- **Reviews Moderation** — Moderate user reviews and ratings
- **Notifications & CMS** — Manage platform notifications and content

### General
- **Role-Based Navigation** — Navbar and menus adapt dynamically to the logged-in user's role
- **Protected Routes** — Bookings page requires login; admin panel requires admin/provider role
- **Responsive Design** — Fully mobile-friendly with animated mobile menu
- **SEO Optimized** — Meta tags and semantic HTML
- **Blog, About, Careers, Contact** — Static informational pages
- **Help Center, Privacy Policy, Safety, Terms of Service** — Support & legal pages

---

## Role-Based Access

HomeCare360 has four user roles, each with distinct access levels:

| Role | Public Site | My Bookings | Provider Dashboard | Full Admin Panel |
|---|:---:|:---:|:---:|:---:|
| **Super Admin** | ✅ | ✅ | — | ✅ All sections |
| **Admin** | ✅ | ✅ | — | ✅ All sections |
| **Provider** | ✅ | ✅ | ✅ (filtered) | ❌ |
| **User** | ✅ | ✅ | — | ❌ |

**Provider Dashboard** shows only sections relevant to the provider:
- Dashboard summary
- Booking Management (their bookings only)
- Reviews & Ratings (their reviews only)

**Admin panel sections visible only to Admin/Super Admin:**
- Services Management
- Service Providers
- Provider Applications
- User Management
- Payments & Escrow
- Notifications & CMS

A default **Super Admin** account is automatically seeded on first server startup if it doesn't exist.

---

## Project Structure

```
homecare360/
├── client/                        # React frontend
│   ├── public/
│   │   └── logo.png
│   ├── src/
│   │   └── app/
│   │       ├── components/
│   │       │   ├── admin/
│   │       │   │   ├── Admin.tsx
│   │       │   │   ├── AdminLayout.tsx       # Role-filtered sidebar
│   │       │   │   ├── AdminDashboard.tsx
│   │       │   │   ├── ServicesManagement.tsx
│   │       │   │   ├── ProviderManagement.tsx
│   │       │   │   ├── ProviderApplications.tsx
│   │       │   │   ├── UserManagement.tsx
│   │       │   │   ├── BookingManagement.tsx
│   │       │   │   ├── PaymentsEscrow.tsx
│   │       │   │   ├── ReviewsModeration.tsx
│   │       │   │   └── NotificationsCMS.tsx
│   │       │   ├── Header.tsx               # Role-aware navbar
│   │       │   ├── Footer.tsx
│   │       │   ├── RootLayout.tsx
│   │       │   ├── ProfileMenu.tsx          # Role-aware profile dropdown
│   │       │   ├── BrowseServices.tsx
│   │       │   ├── ViewProfile.tsx
│   │       │   ├── MyBookings.tsx
│   │       │   ├── BecomeProvider.tsx
│   │       │   ├── HomePage.tsx
│   │       │   ├── AdminRoute.tsx           # Route guard: admin/superadmin/provider
│   │       │   ├── ProtectedRoute.tsx       # Route guard: logged-in users
│   │       │   └── GuestRoute.tsx           # Route guard: unauthenticated users
│   │       ├── context/
│   │       │   └── UserContext.tsx          # Global auth state (user, role, token)
│   │       ├── pages/
│   │       │   ├── Login.tsx
│   │       │   ├── Signup.tsx
│   │       │   ├── ForgotPassword.tsx
│   │       │   ├── AboutUs.tsx
│   │       │   ├── Blog.tsx
│   │       │   ├── Careers.tsx
│   │       │   ├── Contact.tsx
│   │       │   ├── HelpCenter.tsx
│   │       │   ├── InstantQuoteEstimator.tsx
│   │       │   ├── PrivacyPolicy.tsx
│   │       │   ├── Safety.tsx
│   │       │   └── TermsOfService.tsx
│   │       ├── lib/
│   │       └── router.tsx
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
│
└── server/                        # Node.js backend
    └── src/
        ├── config/
        │   └── db.js              # MongoDB connection + seedAdmin
        ├── controllers/
        │   ├── admin-controller.js
        │   ├── booking-controller.js
        │   ├── provider-controller.js
        │   ├── review-controller.js
        │   └── service-controller.js
        ├── middleware/
        │   └── auth.js            # JWT verification middleware
        ├── models/
        │   ├── user.js            # User model (role field)
        │   ├── booking.js
        │   ├── review.js
        │   └── service.js
        ├── routes/
        │   └── v1/
        │       ├── index.js
        │       ├── admin.js
        │       ├── bookings.js
        │       ├── provider.js
        │       ├── reviews.js
        │       └── services.js
        ├── services/
        │   ├── admin-service.js
        │   ├── booking-service.js
        │   ├── provider-service.js
        │   ├── review-service.js
        │   └── service-service.js
        ├── utils/
        │   └── seedAdmin.js       # Auto-creates super admin on startup
        └── index.js               # Express app entry point
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/armanali0786/homecare360.git
cd homecare360
```

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory (see [Environment Variables](#environment-variables)), then start the server:

```bash
node src/index.js
```

The server runs on `http://localhost:5000`. On first startup, a super admin account is automatically created if one doesn't exist.

### 3. Setup the Client

```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

### 4. Build for Production

```bash
cd client
npm run build
```

Output is in `client/dist/` — deploy this folder to Netlify or any static host.

---

## Environment Variables

### Server (`server/.env`)

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/homecare360
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@homecare360.com
ADMIN_PASSWORD=your_secure_admin_password
```

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## API Reference

All API endpoints are prefixed with `/api/v1`.

### Auth
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | Public |
| POST | `/auth/login` | Login and receive JWT | Public |
| POST | `/auth/forgot-password` | Request password reset | Public |

### Services
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/services` | List all services | Public |
| POST | `/services` | Create a service | Admin |
| PUT | `/services/:id` | Update a service | Admin |
| DELETE | `/services/:id` | Delete a service | Admin |

### Providers
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/provider/all` | List all providers | Public |
| GET | `/provider/:id` | Get provider profile | Public |
| POST | `/provider/apply` | Submit provider application | Auth |

### Bookings
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/bookings` | Get user's bookings | Auth |
| POST | `/bookings` | Create a booking | Auth |
| PUT | `/bookings/:id` | Update booking status | Auth |

### Reviews
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/reviews` | Get all reviews | Public |
| POST | `/reviews` | Submit a review | Auth |

### Admin
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/admin/dashboard` | Platform stats | Admin |
| GET | `/admin/users` | All users | Admin |
| GET | `/admin/applications` | Provider applications | Admin |
| PUT | `/admin/applications/:id` | Approve/reject application | Admin |
| GET | `/admin/bookings` | All bookings | Admin |
| GET | `/admin/payments` | Payment records | Admin |

---

## Admin Panel

The admin panel is accessible at `/admin` and is protected by role-based route guards.

### Accessing the Admin Panel
1. Login with an admin or super admin account
2. You are automatically redirected to `/admin` after login
3. The sidebar shows sections based on your role

### Default Super Admin
On first server startup, a super admin is seeded automatically using the `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables.

### Admin Sections

| Section | Description |
|---|---|
| **Dashboard** | Platform overview — total users, bookings, revenue, providers |
| **Services Management** | Add, edit, delete service categories offered on the platform |
| **Service Providers** | View all approved providers, manage their status |
| **Provider Applications** | Review pending applications, approve or reject |
| **User Management** | View all registered users, manage accounts |
| **Booking Management** | View all bookings, update statuses |
| **Payments & Escrow** | Monitor payment transactions and escrow balances |
| **Reviews & Ratings** | Moderate user-submitted reviews |
| **Notifications & CMS** | Send platform notifications, manage content |

---

## Pages & Routes

### Public Routes
| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with hero, services overview, and CTAs |
| `/services` | Browse Services | Filter and search all available services |
| `/profile/:providerId` | View Profile | Individual provider profile with ratings and reviews |
| `/quote-estimator` | Quote Estimator | Estimate cost before booking |
| `/become-provider` | Become Provider | Application form for new service providers |
| `/about-us` | About Us | Company information |
| `/blog` | Blog | Platform blog and articles |
| `/careers` | Careers | Job listings |
| `/contact` | Contact | Contact form |
| `/help-center` | Help Center | FAQs and support |
| `/privacy-policy` | Privacy Policy | Privacy policy |
| `/safety` | Safety | Safety guidelines |
| `/terms-of-service` | Terms of Service | Terms and conditions |

### Guest-Only Routes (redirect if logged in)
| Route | Page |
|---|---|
| `/login` | Login |
| `/signup` | Sign Up |
| `/forgot-password` | Forgot Password |

### Protected Routes (login required)
| Route | Page | Roles |
|---|---|---|
| `/bookings` | My Bookings | All logged-in users |
| `/admin/*` | Admin Panel | Admin, Super Admin, Provider |

---

## License

This project is proprietary software. All rights reserved © HomeCare360.
