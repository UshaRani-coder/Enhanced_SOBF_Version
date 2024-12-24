const express = require('express');
const { getAdmin, updateAdmin, createAdmin, deleteAdmin } = require('../controllers/admin.controller');
const admin_router = express.Router();


admin_router.post('/create-admin', createAdmin);                // Create an Admin
admin_router.get('/get-admin', getAdmin);                       // Get All Admins
admin_router.put('/update-admin/:id', updateAdmin);             // Update Admin
admin_router.delete('/delete-admin/:id', deleteAdmin);          // Delete Admin

module.exports = admin_router;
