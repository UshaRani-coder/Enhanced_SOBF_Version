require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});
const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const router = require('./routes/post.route');
const admin_router = require('./routes/admin.route');
const donationRoute = require('./routes/razorpay.route');
const logger = require('./logger');

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------------- CORS ---------------- */

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
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

/* ---------------- SECURITY ---------------- */

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);

/* ---------------- BODY PARSING ---------------- */

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* ---------------- LOGGING ---------------- */

app.use(
  morgan(':method :url :status :response-time', {
    stream: {
      write: (message) => {
        const parts = message.trim().split(' ');
        const [method, url, status, responseTime] = parts;

        logger.info(
          JSON.stringify({
            method,
            url,
            status,
            responseTime: responseTime?.replace('ms', ''),
          }),
        );
      },
    },
  }),
);

/* ---------------- STATIC FILES (OPTIONAL - not needed for Cloudinary) ---------------- */
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ---------------- ROUTES ---------------- */

app.use('/api/admin', admin_router);
app.use('/api/post', router);
app.use('/api/donation', donationRoute);

/* ---------------- HEALTH CHECK ---------------- */

app.get('/', (req, res) => {
  res.send('Welcome to SOBF - 🙏');
});

/* ---------------- ERROR HANDLER ---------------- */

app.use((err, req, res, next) => {
  console.error('🔥 GLOBAL ERROR:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
});

/* ---------------- DATABASE + SERVER START ---------------- */

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
