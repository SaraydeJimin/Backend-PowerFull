const Joi = require("joi");

const catalogForCreation = Joi.object({
    nombre: Joi.string().max(200).required(),
    descripcion: Joi.string().required(),
});

const catalogForUpdate = Joi.object({
  nombre: Joi.string().max(200).required(),
  descripcion: Joi.string().required(),
});

const catalogForSearch = Joi.object({
    nombre: Joi.string().max(200).required(),
});

const catalogForDelete = Joi.object({
  nombre: Joi.string().max(200).required(),
  descripcion: Joi.string().required(),
})

module.exports = {
  catalogForCreation,
  catalogForUpdate,
  catalogForSearch,
  catalogForDelete
};
