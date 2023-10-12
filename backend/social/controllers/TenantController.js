const db = require("../db/models");
const {
    tenantValidationSchema,
} = require("../validation/tenantProfile");

const getAllTenant = async (req, res) => {
  try {
    const tenant = await db.TenantProfile.findAll();
    return res.status(200).json(tenant);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getTenantById = async (req, res) => {
  try {
    const tenant = await db.TenantProfile.findOne({
      where: { id: req.params.id },
    });
    if (tenant) {
      return res.status(200).json(tenant);
    }
    return res.status(400).json({ message: "Tenant Not Exist" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const createTenant = async (req, res) => {
  try {
    const { error, value } = tenantValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newTenant = await db.TenantProfile.create(value);
    return res.status(200).json(newTenant);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateTenant = async (req, res) => {
  try {
    const { error, value } = tenantValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const tenant = await db.TenantProfile.findByPk(req.params.id);
    if (!tenant) {
      return res.status(404).json({ error: "Tenant not Exist" });
    }

    tenant.set(value);
    await tenant.save();

    return res.status(200).json(tenant);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTenant = async (req, res) => {
  try {
    const tenant = await db.TenantProfile.findOne({
      where: { id: req.params.id },
    });
    if (tenant) {
      await db.TenantProfile.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res
        .status(200)
        .json({ message: "tenant Deleted Seccesfully", response: tenant });
    }
    return res.status(400).json({ message: "Tenant Not Exist" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllTenant,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
};
