const Joi = require('joi');

module.exports = {
  todo: {
    body: {
      text: Joi.string()
        .min(2)
        .required(),
    },
  },
  post: {
    body: {
      title: Joi.string().required(),
      body: Joi.string().required(),
    },
  },
};
