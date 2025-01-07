const express = require('express');
const { protectedRoute, registerAdmin, loginAdmin } = require('../controllers/newAdmin.controller');

const admin_router = express.Router();


admin_router.get('/protected', protectedRoute );
admin_router.post('/register', registerAdmin);
admin_router.post('/login', loginAdmin);       

module.exports = admin_router;
