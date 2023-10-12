// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const users = require("./users");
const tenant = require("./tenant");
// Define routes
router.use("/users", users);
router.use("/tenant", tenant);
module.exports = router;
