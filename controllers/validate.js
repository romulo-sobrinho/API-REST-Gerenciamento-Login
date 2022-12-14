const Joi = require('@hapi/joi')

const validate = {
  registerValidate: (data) => {
    const schema = Joi.object({
      name: Joi.string().required().min(3).max(50),
      email: Joi.string().required().min(3).max(100),
      password: Joi.string().required().min(6).max(200)
    })
    return schema.validate(data)
  },

  LoginValidate: (data) => {
    const schema = Joi.object({
      email: Joi.string().required().min(3).max(100),
      password: Joi.string().required().min(6).max(200)
    })
    return schema.validate(data)
  }
}

module.exports.registerValidate = registerValidate;
module.exports.LoginValidate = loginValidate;