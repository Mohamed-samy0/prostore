<div align="center">

# 🛍️ ProStore

**A full-stack, production-grade e-commerce platform built with the modern Next.js App Router.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white)](https://neon.tech/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Auth.js](https://img.shields.io/badge/Auth.js-v5-purple?logo=auth0&logoColor=white)](https://authjs.dev/)

[Overview](#-overview) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Environment Variables](#-environment-variables) • [Project Structure](#-project-structure)

</div>

---

## 📖 Overview

**ProStore** is a complete online storefront and back-office system, built to demonstrate real-world, production-oriented patterns with the Next.js App Router: server actions instead of a separate REST layer, a fully relational data model with Prisma, credential-based authentication with session-aware guest carts, and pluggable payment providers (PayPal, Stripe, and Cash on Delivery).

It isn't a static template — it's an end-to-end system covering the entire commerce loop: **browse → cart → checkout → pay → fulfill → review**, plus an admin dashboard to manage all of it.

---

## ✨ Features

### 🛒 Storefront
- Product catalog with **search, category filters, price ranges, rating filters, sorting, and pagination**
- Product detail pages with image galleries, stock awareness, and customer reviews
- Featured products carousel and promotional banners on the homepage
- Persistent **guest cart** (cookie-based session cart) that automatically **merges into the user's cart** on sign-in
- Star-rating **review system** tied to verified purchases

### 🔐 Authentication & Accounts
- Credentials-based authentication via **Auth.js (NextAuth v5)** with JWT sessions
- Secure password hashing with `bcrypt-ts-edge`
- Route protection via Next.js **proxy middleware** (`proxy.ts`) guarding checkout, orders, profile, and admin routes
- User profile management and personal order history

### 💳 Checkout & Payments
- Multi-step checkout: **shipping address → payment method → order review → place order**
- Multiple payment integrations out of the box:
  - **PayPal** (`@paypal/react-paypal-js`)
  - **Stripe** (Checkout + webhook-driven payment confirmation)
  - **Cash on Delivery**
- Automatic order totals: items, tax, shipping, and grand total calculation
- Transactional **email receipts** on purchase, sent via **Resend** using **React Email** templates

### 🛠️ Admin Dashboard
- Sales & performance **overview with interactive charts** (`recharts`)
- Full CRUD product management, including **image uploads** via **UploadThing**
- Order management — mark orders as paid / delivered, inspect payment results
- User management — view and update user roles

### 🎨 UI/UX
- Built with **Tailwind CSS v4**, **Radix UI primitives**, and **shadcn/ui** components
- Light/dark theme support via `next-themes`
- Toast notifications (`sonner`), drawers (`vaul`), and carousels (`embla-carousel`)
- Fully responsive, accessible component library in `components/ui`

### ✅ Quality
- Type-safe forms with **React Hook Form + Zod** schema validation end-to-end
- Unit tests with **Jest** / **ts-jest**
- Strict **ESLint** configuration for Next.js + TypeScript

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server Actions, Server Components) |
| **Language** | TypeScript |
| **UI** | React 19, Tailwind CSS 4, Radix UI, shadcn/ui, Lucide Icons |
| **Database** | PostgreSQL (via [Neon](https://neon.tech/) serverless driver / `pg`) |
| **ORM** | [Prisma 7](https://www.prisma.io/) |
| **Auth** | [Auth.js (NextAuth v5)](https://authjs.dev/) with the Prisma adapter |
| **Payments** | PayPal, Stripe |
| **File Uploads** | [UploadThing](https://uploadthing.com/) |
| **Transactional Email** | [Resend](https://resend.com/) + [React Email](https://react.email/) |
| **Forms & Validation** | React Hook Form, Zod |
| **Charts** | Recharts |
| **Testing** | Jest, ts-jest |

---

## 🏗️ Architecture

ProStore leans fully into the App Router paradigm rather than reaching for a separate API layer:

- **Server Actions** (`lib/actions/*`) handle all mutations — cart operations, order placement, product/user/review management — colocated with the domain they belong to (`cart.action.ts`, `order.actions.ts`, `product.actions.ts`, `review.actions.ts`, `user.actions.ts`).
- **Route Groups** cleanly separate concerns in `app/`:
  - `(root)` — the public storefront (home, search, product, cart, checkout)
  - `(auth)` — sign-in / sign-up flows
  - `admin` — the protected back-office dashboard
  - `user` — the authenticated customer area (profile, orders)
  - `api` — only used where a true HTTP endpoint is required: NextAuth handlers, Stripe webhooks, and UploadThing's file router
- **`proxy.ts`** — Next.js 16's evolution of `middleware.ts` — enforces authorization on protected route patterns and provisions the guest `sessionCartId` cookie for anonymous shopping carts.
- **Prisma schema** (`prisma/schema.prisma`) models the full commerce domain: `User`, `Account`/`Session` (Auth.js), `Product`, `Cart`, `Order`, `OrderItem`, and `Review`, with UUID primary keys and precise `Decimal` types for monetary fields.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.18+ (or 20+ recommended)
- A **PostgreSQL** database (a free [Neon](https://neon.tech/) instance works great)
- Accounts/API keys for whichever integrations you want to enable: PayPal, Stripe, Resend, UploadThing

### 1. Clone & Install

```bash
git clone https://github.com/Mohamed-samy0/prostore.git
cd prostore
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root — see the [Environment Variables](#-environment-variables) section below for the full list.

### 3. Set Up the Database

```bash
npx prisma generate
npx prisma migrate deploy   # apply existing migrations
npm run db:seed 2>/dev/null || npx tsx db/seed.ts   # seed sample products & users
```

> The Prisma client is generated into `lib/generated/prisma` (custom output path — already configured in `prisma/schema.prisma`).

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run Tests

```bash
npm test
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `AUTH_SECRET` | ✅ | Secret used by Auth.js to sign/encrypt tokens |
| `NEXT_PUBLIC_APP_NAME` | ⬜ | Display name of the store (defaults to `prostore`) |
| `NEXT_PUBLIC_APP_DESCRIPTION` | ⬜ | Store tagline / meta description |
| `NEXT_PUBLIC_SERVER_URL` | ⬜ | Public base URL (defaults to `http://localhost:3000`) |
| `LATEST_PRODUCT_LIMIT` | ⬜ | How many "latest products" to show on the homepage |
| `PAGE_SIZE` | ⬜ | Products per page in listings |
| `PAYMENT_METHODS` | ⬜ | Comma-separated list, e.g. `PayPal, Stripe, CashOnDelivery` |
| `DEFAULT_PAYMENT_METHOD` | ⬜ | Default preselected payment method |
| `USER_ROLES` | ⬜ | Comma-separated list, e.g. `admin, user` |
| `PAYPAL_CLIENT_ID` | ✅ (if using PayPal) | PayPal REST API client ID |
| `PAYPAL_API_URL` | ✅ (if using PayPal) | PayPal API base URL (sandbox or live) |
| `STRIPE_SECRET_KEY` | ✅ (if using Stripe) | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ✅ (if using Stripe) | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | ✅ (if using Stripe) | Signing secret for the Stripe webhook endpoint |
| `RESEND_API_KEY` | ✅ (for emails) | Resend API key for transactional receipts |
| `SENDER_EMAIL` | ⬜ | "From" address for order emails |
| `UPLOADTHING_TOKEN` | ✅ (for image uploads) | UploadThing API token |

> ⚠️ Never commit your `.env` file — it's already excluded via `.gitignore`.

---

## 📁 Project Structure

```
prostore/
├── app/
│   ├── (auth)/            # Sign-in / sign-up pages
│   ├── (root)/            # Public storefront: home, search, product, cart, checkout
│   ├── admin/              # Admin dashboard: overview, products, orders, users
│   ├── user/               # Authenticated customer area: profile, orders
│   └── api/                 # NextAuth handlers, Stripe webhooks, UploadThing router
├── components/
│   ├── shared/               # Domain components: header, product cards, admin widgets
│   └── ui/                   # Reusable shadcn/ui primitives
├── db/                        # Prisma client instance, sample/seed data
├── email/                     # React Email templates + send logic (Resend)
├── lib/
│   ├── actions/                # Server actions: cart, orders, products, reviews, users
│   ├── constants/               # App-wide constants sourced from env vars
│   ├── validators.ts             # Zod schemas shared by forms & server actions
│   └── utils.ts
├── prisma/
│   ├── schema.prisma              # Full data model
│   └── migrations/
├── types/                          # Shared TypeScript types
├── tests/                           # Jest test suites
├── auth.ts                          # Auth.js configuration
└── proxy.ts                         # Route protection & guest cart provisioning
```

---

## 🗺️ Data Model at a Glance

```
User ──< Order ──< OrderItem >── Product
 │                                  │
 ├──< Review >──────────────────────┘
 │
 └──< Cart
```

- **Product** — catalog item with pricing, stock, images, rating aggregate, and featured/banner flags
- **User** — Auth.js-managed account with role-based access (`admin` / `user`)
- **Cart** — guest or user-owned, stores line items as JSON with computed totals
- **Order / OrderItem** — an immutable snapshot of purchased items, payment status, and delivery status
- **Review** — user rating + comment tied to a specific product

---

## 🚢 Deployment

ProStore is ready to deploy on **[Vercel](https://vercel.com/new)** in minutes:

1. Push the repository to GitHub (already done ✅)
2. Import the project into Vercel
3. Add all required environment variables in the Vercel dashboard
4. Point `DATABASE_URL` to a production Postgres instance (Neon recommended)
5. Deploy 🚀

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<div align="center">

Built with ❤️ by [Mohamed Samy](https://github.com/Mohamed-samy0)

</div>
