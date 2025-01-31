module.exports = {
  apps: [
    {
      name: 'frontend',
      env: {
        NODE_ENV: 'production',
        JWT_SECRET: process.env.JWT_SECRET,
      },
    },
  ],
};
