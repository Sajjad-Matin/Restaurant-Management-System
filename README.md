# 🍽️ ORMS — Online Restaurant Management System

> A production-grade, full-stack restaurant management system for online ordering, table reservations, and restaurant operations.

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Team](#team)

---

## Overview

ORMS is a full-stack restaurant management platform with three core applications:

- **Backend API** — RESTful API built with NestJS, Prisma, and PostgreSQL
- **Customer Site** — Public-facing Next.js app for browsing menus, placing orders, and booking tables
- **Admin Dashboard** — Internal Next.js app for managing menu, orders, reservations, and analytics

---

## Features

### Customer Site
- 🛒 Browse menu by category and add items to cart
- 📦 Place orders and track order status in real-time
- 🪑 Book a table with date, time, and guest count
- 💳 Pay securely via HesabPay
- 👤 Register, login, and manage profile

### Admin Dashboard
- 📊 Overview dashboard with daily orders, revenue, and reservations
- 🧾 Manage and update order statuses
- 🍕 Add, edit, and delete menu items with image upload
- 📅 Approve or reject reservation requests
- 👥 View customer list

### Backend
- 🔐 JWT authentication with role-based access control (Admin / Customer)
- 🔄 Refresh token rotation (7-day expiry)
- 💰 HesabPay payment integration with webhook verification
- 📡 Real-time order updates via WebSocket or polling

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | NestJS, TypeScript |
| ORM | Prisma |
| Database | PostgreSQL |
| Frontend | Next.js 14 (App Router) |
| State Management | Zustand |
| Auth | JWT (Access + Refresh Tokens) |
| Payments | HesabPay |
| Image Storage | Cloudinary |
| Charts | Recharts |
| Deployment | Railway, Vercel |

---

## Architecture

```
ORMS/
├── backend/           → NestJS REST API
├── customer-site/     → Next.js public-facing app
├── admin-dashboard/   → Next.js admin panel
└── shared/            → Shared types & constants
```

### Backend Modules

```
backend/src/
├── auth/              → JWT auth, roles
├── users/             → Register, login, profile
├── menu/              → Categories, items, prices
├── orders/            → Create & track orders
├── reservations/      → Table booking & management
├── payments/          → HesabPay integration
├── dashboard/         → Stats & analytics
├── prisma/            → Prisma service
└── main.ts
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ORMS.git
cd ORMS
```

### 2. Setup the Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

### 3. Setup the Customer Site

```bash
cd customer-site
npm install
npm run dev
```

### 4. Setup the Admin Dashboard

```bash
cd admin-dashboard
npm install
npm run dev
```

---

## Environment Variables

### Backend — `backend/.env`

```env
DATABASE_URL=postgresql://user:password@localhost:5432/orms
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
HESABPAY_API_KEY=your_hesabpay_key
HESABPAY_CALLBACK_URL=https://yourdomain.com/payments/verify
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Customer Site — `customer-site/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Admin Dashboard — `admin-dashboard/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## API Endpoints

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | `/auth/register` | Public |
| POST | `/auth/login` | Public |
| GET | `/auth/me` | Authenticated |

### Menu
| Method | Endpoint | Access |
|---|---|---|
| GET | `/menu/categories` | Public |
| GET | `/menu/items` | Public |
| GET | `/menu/items/:id` | Public |
| POST | `/menu/items` | Admin |
| PATCH | `/menu/items/:id` | Admin |
| DELETE | `/menu/items/:id` | Admin |

### Orders
| Method | Endpoint | Access |
|---|---|---|
| POST | `/orders` | Customer |
| GET | `/orders/my` | Customer |
| GET | `/orders` | Admin |
| PATCH | `/orders/:id/status` | Admin |

### Reservations
| Method | Endpoint | Access |
|---|---|---|
| POST | `/reservations` | Customer |
| GET | `/reservations/my` | Customer |
| GET | `/reservations` | Admin |
| PATCH | `/reservations/:id` | Admin |

### Payments
| Method | Endpoint | Access |
|---|---|---|
| POST | `/payments/initiate` | Customer |
| POST | `/payments/verify` | HesabPay Webhook |

---

## Database Schema

```
User          → id, name, email, password, role, createdAt
Category      → id, name, image
MenuItem      → id, name, description, price, image, categoryId, available
Order         → id, userId, total, status, paymentStatus, createdAt
OrderItem     → id, orderId, menuItemId, quantity, price
Reservation   → id, userId, date, time, guests, status
Payment       → id, orderId, amount, provider, transactionId, status
```

---

## Deployment

| Service | Platform |
|---|---|
| Backend API | Railway or Render |
| Customer Site | Vercel |
| Admin Dashboard | Vercel |
| Database | Railway PostgreSQL or Supabase |
| Images | Cloudinary |
---

## License

This project is private and intended for internal use only.
