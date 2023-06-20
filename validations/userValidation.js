const Joi = require('joi');

const userValidation = (data) =>{
  const userSchema = Joi.object({
    username : Joi.string().required(),
    email : Joi.string().email().required(),
    password : Joi.string().required(),
    phone : Joi.string().required()
  });

  return {error, value } = userSchema.validate(data);
};

const updateValidation = (data) =>{
  const updateSchema = Joi.object({
    user_id : string(),
    username : string(),
    email : string().email(),
    password : string(),
    phone : string()
  });
  return {error, value} = updateSchema.validate(data);
};

module.exports = {
                  userValidation,
                  updateValidation
                };