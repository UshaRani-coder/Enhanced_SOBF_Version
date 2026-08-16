# SOBF Admin Panel

The **SOBF Admin Panel** is a React-based dashboard used to manage the **Soul of Braj Federation (SOBF)** website. It allows administrators to manage website content, events, media, users, donations, and other administrative operations.

## Features

* Authentication
* Dashboard
* Gallery Management
* Upcoming Events Management
* Event Registered Users Management
* Our Impacts Management
* Featured Videos Management
* News Management
* Recent Activities Management
* Our Services Management
* Volunteers Management
* Donors Management
* Subscribed Donors Management
* Donation Categories Management
* Hero Banner Management
* Team Management
* Legal Documents Management
* Responsive UI
* Cloudinary Integration

## Tech Stack

* React
* Vite
* React Router
* Redux Toolkit
* Tailwind CSS
* Axios

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the frontend

```bash
cd <project-folder>
cd frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the frontend project root:

```env
VITE_BASE_URL=http://localhost:5000/api
```

Update the API URL according to the environment.

> **Note:** Make sure the environment variable name matches the one used in the application code.

### 5. Start the Development Server

```bash
npm run dev
```

The application will start on the local development server provided by Vite.

## Available Scripts

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

### Run ESLint

```bash
npm run lint
```

## Environment Variables

| Variable       | Description          | Example                     |
| -------------- | -------------------- | --------------------------- |
| `VITE_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |

For production, replace the development BASE URL with the deployed backend BASE URL.


## License

This project is developed for the **Soul of Braj Federation (SOBF)**.
