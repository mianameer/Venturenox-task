// routes/tenantRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllTenant,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
} = require("../controllers/TenantController");

// Define routes
router.get("/", getAllTenant);
router.get("/:id", getTenantById);
router.post("/", createTenant);
router.put("/:id", updateTenant);
router.delete("/:id", deleteTenant);

module.exports = router;
