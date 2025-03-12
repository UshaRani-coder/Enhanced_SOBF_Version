module.exports = {
  apps: [
    {
      name: 'backend',
      script: './app.js',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 5000,
        MONGO_URI: process.env.MONGO_URI,
        JWT_SECRET: process.env.JWT_SECRET,
        CLOUDINARY_API_NAME: process.env.CLOUDINARY_API_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASS: process.env.SMTP_PASS,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        BASE_URL: "https://backend.sobf.in"
      },
    },
  ],
};
