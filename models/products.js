// Importamos la librería Joi para realizar validaciones de datos
const Joi = require("joi");
const { image } = require("../config/cloudinary");

const productForCreation = Joi.object({
  id_catalogo: Joi.number().required(),
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  image: Joi.string().uri().optional()
});

// Creamos un esquema de validación para la actualización de productos usando Joi
const productForUpdate = Joi.object({
  // Los mismos campos que en 'productForCreation' pero para actualización de producto
  id_catalogo: Joi.number().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  image: Joi.string().uri().optional()
});

// Creamos un esquema de validación para la búsqueda de productos por catálogo
const productForSearch = Joi.object({
  id_catalogo: Joi.number().optional(),
  name: Joi.string().optional(),
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional()
});

const productForDelete = Joi.object({
  id_producto: Joi.number().required(),
});


// Exportamos los esquemas de validación para que puedan ser utilizados en otras partes del proyecto
module.exports = { productForCreation, productForUpdate, productForSearch, productForDelete };
