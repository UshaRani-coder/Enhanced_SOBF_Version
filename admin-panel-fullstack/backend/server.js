require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const router = require('./routes/post.route');
const admin_router = require('./routes/admin.route');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------------- CORS ---------------- */

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:4173',
  'https://sobf.in',
  'https://admin.sobf.in',
  'https://backend.sobf.in',
  'https://www.sobf.in',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

/* ---------------- BODY PARSING ---------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- ROUTES ---------------- */

app.use('/api/admin', admin_router);
app.use('/api/post', router);

/* ---------------- HEALTH CHECK ---------------- */

app.get('/', (req, res) => {
  res.send('Welcome to SOBF - 🙏');
});

/* ---------------- GLOBAL ERROR HANDLER ---------------- */

app.use((err, req, res, next) => {
  console.error('🔥 SERVER ERROR:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
});

/* ---------------- START SERVER ONLY AFTER DB ---------------- */

connectDB()
  .then(() => {
    console.log('✅ Database connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  });
