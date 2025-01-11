require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const router = require('./routes/post.route');
const admin_router = require('./routes/admin.route');



const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api/admin', admin_router);  //  admin routes
app.use('/api/post', router); // post routes & bulleting routes

app.get("/", (req, res) => res.send("Working fine"))

app.listen(PORT, console.log(`Server running on port ${PORT}`));
connectDB()