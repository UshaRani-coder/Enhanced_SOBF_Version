module.exports = {
	apps: [
		{
			name: "backend",
			script: "./app.js",
			env: {
				NODE_ENV: "production",
				MONGO_URI:
					"mongodb+srv://imnewto2:2INSHv0q4eylYxXC@adminpanelnew.vksdt.mongodb.net/new-admin-panel?retryWrites=true&w=majority",
			},
		},
	],
};
