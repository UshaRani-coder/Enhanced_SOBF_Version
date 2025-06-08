const express = require('express');
const { createOrder, saveDonation, getDonorInfo } = require('../controllers/razorpaydonation.controller');

// ! # THIS FILE IS ONLY FOR MAIN DONATION BUTTON IN MAIN FRONTEND  



const router = express.Router();

router.post('/create-razorpay-order', createOrder);
router.post('/save-donation', saveDonation);
router.get("/getdonation", getDonorInfo)

module.exports = router;
