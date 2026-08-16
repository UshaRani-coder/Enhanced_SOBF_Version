
# Soul-Of-Braj

**Soul of Braj Federation (SOBF)** is a full-stack web platform built to support the organization's digital presence, showcase its initiatives and impact, manage community activities, and facilitate donations and engagement.

The platform consists of a public-facing website, an administrative dashboard, and a backend API that work together to provide a complete content and management system.

## Overview

The SOBF platform enables the organization to:

- Showcase its mission, vision, and initiatives
- Manage and display gallery images and videos
- Publish news, posts, and recent activities
- Manage upcoming events and registrations
- Manage volunteers and donors
- Accept and manage online donations
- Showcase organizational impacts and services
- Manage team members
- Manage hero banners and featured content
- Publish legal documents
- Manage website content through the admin dashboard

## Project Architecture

```text
                         SOBF Platform
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
       Main Frontend      Admin Panel       Backend API
       Public Website    Admin Dashboard    REST API
             │                │                │
             └────────────────┼────────────────┘
                              │
                    ┌─────────┼─────────┐
                    │         │         │
                    ▼         ▼         ▼
                 Database  Cloudinary  Razorpay

                              │
                              ▼
                           Email
```

### Main Frontend

The public-facing website where visitors can explore SOBF's mission, initiatives, events, gallery, news, team, services, impacts, and donation options.

### Admin Panel

A secure dashboard used by administrators to manage website content, events, users, donations, media, and other administrative operations.

### Backend

Provides the REST APIs, authentication, business logic, database operations, payment processing, email services, and integrations required by the frontend applications.

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- REST APIs
- JWT Authentication
- Nodemailer

### External Services

- **Cloudinary** — Image and media management
- **Razorpay** — Online donation/payment processing
- **Email/SMTP** — Transactional email notifications

## Project Structure

```text
Soul-Of-Braj/
│
├── Main-Frontend/
│   └── README.md
│
├── Admin-Panel/
│   └── README.md
│
├── Backend/
│   └── README.md
│
└── README.md
```

## Getting Started

The project consists of three major applications:

1. **Main Frontend** — Public SOBF website
2. **Admin Panel** — Administrative dashboard
3. **Backend** — REST API and server-side services

Each application has its own setup instructions, environment variables, development commands, and deployment instructions.

### Application Documentation

- **Main Frontend** — See `Main-Frontend/README.md`
- **Admin Panel** — See `Admin-Panel/README.md`
- **Backend** — See `Backend/README.md`

## Development Workflow

During development, the applications communicate through the backend API:

```text
Main Frontend ──┐
                ├──> Backend API ──> Database
Admin Panel ────┘           │
                            ├──> Cloudinary
                            ├──> Razorpay
                            └──> Email/SMTP
```

The backend should be running before using features that require API communication.

## License

This project is developed for the **Soul of Braj Federation (SOBF)**.
