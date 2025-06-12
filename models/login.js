// Importamos la librería Joi para realizar validaciones de datos
const Joi = require("joi");

// Creamos un esquema de validación para el login usando Joi
const login = Joi.object({
  // Validamos que el 'email' sea una cadena de texto con formato de correo y es obligatorio
  email: Joi.string().email().required(),
  // Validamos que la 'password' sea una cadena de texto de al menos 6 caracteres y es obligatorio
  password: Joi.string().min(6).required()
});

// Creamos un esquema para buscar usuario por su correo
const loginForSearch = Joi.object({
  // Validamos que el 'id_usuario' sea un número entero y obligatorio
  id_usuario: Joi.number().integer().required(),
});

// Creamos un esquema para actualizar los datos del usuario
const loginForUpdate = Joi.object({
  documento: Joi.number().integer().required(),
  nombre: Joi.string().min(3).required(),
  // Validamos que el 'email' tenga formato de correo y sea obligatorio
  apellido: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  // Validamos que la 'password' sea una cadena de texto de al menos 6 caracteres
  password: Joi.string().min(6).required(),
  // Validamos que la 'direccion' sea una cadena de texto y obligatoria
  direccion: Joi.string().required(),
  // Validamos que el 'telefono' tenga entre 7 y 10 dígitos numéricos
  telefono: Joi.string().pattern(/^\d{7,10}$/).required()
});

// Creamos un esquema para eliminar un usuario (usualmente usado para verificación previa)
const loginForDelete = Joi.object({
  // Validamos que el 'id_usuario' sea un número entero y obligatorio
  id_usuario: Joi.number().integer().required(),
});

// Exportamos los esquemas de validación para que puedan ser utilizados en otras partes del proyecto
module.exports = { login, loginForSearch, loginForUpdate, loginForDelete };
