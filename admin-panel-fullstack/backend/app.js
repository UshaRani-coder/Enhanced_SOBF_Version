const express = require('express');
const helmet = require('helmet'); // ✅ Security middleware
const connectDB = require('./config/db');
const cors = require('cors');
const router = require('./routes/post.route');
const admin_router = require('./routes/admin.route');
const path = require('path');
const app = express();
const logger = require('./logger');
const morgan = require('morgan');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});


console.log(`Your env is ${process.env.NODE_ENV}`);
console.log(`Your PORT is ${process.env.PORT}`);

const PORT = process.env.PORT || 5000;

// ✅ Allowed Origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://sobf.in',
  'https://admin.sobf.in',
  'https://backend.sobf.in',
];

// ✅ CORS Middleware
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false); // ❌ Do not throw an error
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// ✅ Helmet Middleware with Custom CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://trusted-script-source.com",
          "https://www.youtube.com",
          "https://player.vimeo.com",
          "https://cdnjs.cloudflare.com",
          "https://apis.google.com"
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com"
        ],
        imgSrc: ["*", "data:"], // Allow images from any source and base64 images
        connectSrc: ["*", "https://backend.sobf.in", "http://localhost:5000"], // Allow any API requests
        frameSrc: ["*", "https://www.youtube.com", "https://player.vimeo.com", "https://maps.google.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Morgan Logging Middleware
const morganFormat = ':method :url :status :response-time';
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const [method, url, status, responseTime] = message.split(" ");
        logger.info(JSON.stringify({ method, url, status, responseTime: responseTime.replace("ms", "") }));
      },
    },
  }),
);

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

//9. for our impacts
app.use(
  '/uploads/upcoming-events',
  express.static(path.join(__dirname, 'uploads/upcoming-events')),
);

//10. for SOBF Video
// app.use(
//   '/uploads/video',
//   express.static(path.join(__dirname, 'uploads/video')),
// );

// ✅ Routes
app.use('/api/admin', admin_router);
app.use('/api/post', router);
app.get('/', (req, res) => res.send('Welcome to SOBF - 🙏'));

// ✅ Connect to Database BEFORE Starting the Server
connectDB().then(() => { app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)) })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
    process.exit(1); // Exit process if DB connection fails
  });
