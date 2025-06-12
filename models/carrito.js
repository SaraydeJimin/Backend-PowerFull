const Joi = require("joi");

// Esquema para crear un carrito
const carritoForCreation = Joi.object({
  id_usuario: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'El ID del usuario debe ser un número',
      'number.integer': 'El ID del usuario debe ser un número entero',
      'number.positive': 'El ID del usuario debe ser un número positivo',
      'any.required': 'El ID del usuario es obligatorio',
    }),
  fecha_creacion: Joi.date().required()
    .messages({
      'date.base': 'La fecha de creación debe ser una fecha válida',
      'any.required': 'La fecha de creación es obligatoria',
    }),
});

// Esquema para actualizar un carrito (si se permite actualizar fecha en tu lógica)
const carritoForUpdate = Joi.object({
  id_usuario: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'El ID del usuario debe ser un número',
      'any.required': 'El ID del usuario es obligatorio',
    }),
  fecha_creacion: Joi.date().required()
    .messages({
      'date.base': 'La fecha debe ser válida',
      'any.required': 'La fecha de creación es obligatoria',
    }),
});

// Esquema para buscar carrito por usuario
const carritoForSearch = Joi.object({
  id_usuario: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'El ID del usuario debe ser un número',
      'any.required': 'El ID del usuario es obligatorio',
    }),
});

module.exports = {
  carritoForCreation,
  carritoForUpdate,
  carritoForSearch
};
