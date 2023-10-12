const Joi = require('joi');

const userValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  department: Joi.string().required(),
  designation: Joi.string().required(),
  tenantId: Joi.number().integer().required(),
  imageUrl: Joi.string().allow('', null),
  city: Joi.string(),
  country: Joi.string(),
  bio: Joi.string().allow('', null),
  socialLinks: Joi.object().allow('', null),
  employeeId: Joi.number().integer().allow('', null),
});

const updateUserValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  department: Joi.string().required(),
  designation: Joi.string().required(),
  imageUrl: Joi.string().allow('', null),
  city: Joi.string(),
  country: Joi.string(),
  bio: Joi.string().allow('', null),
  socialLinks: Joi.object().allow('', null),
});


module.exports = {
  userValidationSchema,
  updateUserValidationSchema
};
