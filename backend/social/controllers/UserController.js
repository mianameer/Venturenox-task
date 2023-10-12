const db = require("../db/models");
const {
  userValidationSchema,
  updateUserValidationSchema,
} = require("../validation/userProfile");

const getAllUsers = async (req, res) => {
  try {
    const users = await db.UserProfile.findAll();
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await db.UserProfile.findOne({
      where: { id: req.params.id },
    });
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(400).json({ message: "User Not Exist" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { error, value } = userValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newUser = await db.UserProfile.create(value);
    return res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { error, value } = updateUserValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await db.UserProfile.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not Exist" });
    }

    user.set(value);
    await user.save();

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await db.UserProfile.findOne({
      where: { tenantId: req.params.id },
    });
    if (user) {
      await db.UserProfile.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res
        .status(200)
        .json({ message: "User Deleted Seccesfully", response: user });
    }
    return res.status(400).json({ message: "User Not Exist" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
