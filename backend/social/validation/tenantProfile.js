const Joi = require("joi");

const tenantValidationSchema = Joi.object({
  tenantName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string(),
  zipCode: Joi.string().allow("", null),
  phone: Joi.string(),
  weburl: Joi.string().allow("", null),
});

module.exports = {
  tenantValidationSchema,
};
