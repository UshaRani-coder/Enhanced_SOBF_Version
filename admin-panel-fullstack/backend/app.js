const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const router = require('./routes/post.route');
const admin_router = require('./routes/admin.route');
const path = require('path');
const app = express();



require("dotenv").config({path: `.env.${process.env.NODE_ENV || "development"}`});
console.log(`Your env is ${process.env.NODE_ENV}`);
console.log(`Your PORT is ${process.env.PORT}`);
const PORT = process.env.PORT || 5000;



// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://sobf.in',
  'https://admin.sobf.in',
  'https://backend.sobf.in/'
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // Allow cookies & auth headers
  allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/uploads'));

//1. for team members
app.use(
  '/uploads/team-member',
  express.static(path.join(__dirname, 'uploads/team-member')),
);

//2. for hero banner
app.use(
  '/uploads/hero-banner',
  express.static(path.join(__dirname, 'uploads/hero-banner')),
);

//3 for recent activites
app.use(
  '/uploads/recent-activities',
  express.static(path.join(__dirname, 'uploads/recent-activities')),
);

//4. for news bulletine
app.use(
  '/uploads/news-bulletine',
  express.static(path.join(__dirname, 'uploads/news-bulletine')),
);

//5. for legal documents
app.use(
  '/uploads/legal-documents',
  express.static(path.join(__dirname, 'uploads/legal-documents')),
);

//6. for our services
app.use(
  '/uploads/our-services',
  express.static(path.join(__dirname, 'uploads/our-services')),
);

//7. for gallery
app.use(
  '/uploads/gallery',
  express.static(path.join(__dirname, 'uploads/gallery')),
);

//8. for our impacts
app.use(
  '/uploads/our-impacts',
  express.static(path.join(__dirname, 'uploads/our-impacts')),
);

app.use('/api/admin', admin_router); //  admin routes
app.use('/api/post', router); // post routes

app.get('/', (req, res) => res.send('Welcome to SOBF - 🙏'));

app.listen(PORT, console.log(`Server running on port ${PORT}`));
connectDB();
