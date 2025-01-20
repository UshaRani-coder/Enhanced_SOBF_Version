module.exports = {
	apps: [
		{
			name: "backend",
			script: "./server.js",
			env: {
				NODE_ENV: "production",
				PORT: process.env.PORT || 5000,
				MONGO_URI: process.env.MONGO_URI,
				JWT_SECRET: process.env.JWT_SECRET,
				CLOUDINARY_API_NAME: process.env.CLOUDINARY_API_NAME,
				CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
				CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
			},
		},
	],
};
