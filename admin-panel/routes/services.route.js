const express = require('express');

const router = express.Router();


// ! routes for  services 
router.get("/get-services",)
router.post("/create-services",)
router.put("/update-services/:id",)
router.delete("/delete-services/:id",)


// ! routes for team
router.get("/get-teams",)
router.post("/create-team",)
router.put("/update-team/:id",)
router.delete("/delete-team/:id",)


// ! routes for supportedBy 
router.get("/get-supportedBy",)
router.post("/create-supportedBy",)
router.put("/update-supportedBy/:id",)
router.delete("/delete-supportedBy/:id",)





module.exports = router 
