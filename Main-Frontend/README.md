# Soul of Braj Federation (SOBF) – Main Frontend

The **Soul of Braj Federation (SOBF)** website is a production-ready, responsive web application built to showcase the organization's mission, initiatives, events, activities, and impact while providing users with multiple ways to engage and contribute.

The application was developed with a focus on **performance, scalability, responsive design, maintainability, and user experience**.

---

## 🌐 About Soul of Braj Federation

**Soul of Braj Federation (SOBF)** is a Section-8 recognized non-profit organization dedicated to serving underprivileged communities in Vrindavan and the Braj region through various social welfare initiatives.

---

## ✨ Key Features

- Responsive and modern public-facing website
- Mission, Vision, Services & Impact sections
- News & Press Releases
- Gallery with images and videos
- Upcoming Events & Event Registration
- Volunteer & Donation sections
- Team Management
- Featured Videos & Recent Activities
- Legal Documents
- Dynamic content powered by REST APIs
- Razorpay donation integration
- Responsive navigation and user-friendly UI
- SEO-friendly pages

---

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **React Router**
- **Redux Toolkit**
- **Tailwind CSS**
- **JavaScript (ES6+)**
- **Axios**
- **React Icons**
- **Cloudinary**
- **Razorpay**

---

## ⚡ Engineering & Optimization

The application was optimized for real-world production usage with a focus on performance and maintainability.

### Performance

- Implemented **code splitting and lazy loading** for faster initial page loads
- Optimized large images and media assets
- Implemented responsive Cloudinary image delivery
- Optimized web videos for reduced payload size
- Added optimized video poster/loading strategies
- Optimized custom fonts using `.woff2`
- Reduced unnecessary JavaScript and asset payloads
- Improved **LCP, FCP, TBT and CLS** through targeted optimization
- Used Lighthouse to identify and address performance bottlenecks

### Frontend Architecture

- Component-based React architecture
- Centralized state management with **Redux Toolkit**
- Reusable components for common UI functionality
- Route-based navigation with **React Router**
- Lazy-loaded application components
- Environment-based API configuration
- Structured API communication using Axios

### User Experience

- Fully responsive across mobile, tablet and desktop
- Loading and fallback states
- Toast notifications
- Smooth navigation and scrolling
- Optimized media loading
- Consistent UI using Tailwind CSS

---


## 🚀 Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd Soul-Of-Braj/Main-Frontend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

```env
VITE_BASE_URL=http://localhost:5000
```

For production:

```env
VITE_BASE_URL=https://backend.sobf.in
```

### Start Development Server

```bash
npm run dev
```

The application runs by default at:

```text
http://localhost:5173
```

---

## 📦 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Create production build  |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## 📱 Responsive Design

The application is optimized for:

- Mobile devices
- Tablets
- Laptops
- Desktop screens

---

## 🎯 Highlights

- Built and optimized a **production-facing React application**
- Implemented **modern React architecture and state management**
- Integrated REST APIs and third-party services
- Improved website performance using **lazy loading, code splitting, and media optimization**
- Optimized image and video delivery for better web performance
- Focused on responsive design and user experience
- Monitored and improved performance using **Google Lighthouse**

---

## 📄 License

This project is maintained for the **Soul of Braj Federation (SOBF)**.
