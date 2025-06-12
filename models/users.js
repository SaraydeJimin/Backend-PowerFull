// Importamos la librería Joi para realizar validaciones de datos
const Joi = require("joi");

// Creamos un esquema de validación para el registro de usuarios usando Joi
const userForRegister = Joi.object({
  // Validamos que 'id_rol' sea una cadena que solo contenga números y es obligatorio
  id_rol: Joi.string()
    .regex(/^[0-9]+$/)  // Regex para asegurarse de que solo contenga números
    .required()  // Campo obligatorio
    .messages({
      // Mensajes personalizados para los errores de validación
      "string.pattern.base": "El ID de rol debe contener solo números.",
      "string.empty": "El ID de rol es requerido.",
    }),

  documento: Joi.number()
  .integer()
  .required()
  .messages({
    "number.base": "El documento debe ser un número entero.",
    "any.required": "El documento es requerido.",
  }),

  
  // Validamos que 'nombre' sea una cadena de texto entre 3 y 50 caracteres y es obligatorio
  nombre: Joi.string()
    .min(3)  // El nombre debe tener al menos 3 caracteres
    .max(50) // El nombre no puede exceder los 50 caracteres
    .required()  // Campo obligatorio
    .messages({
      "string.min": "El nombre debe tener al menos 3 caracteres.",
      "string.max": "El nombre no puede exceder los 50 caracteres.",
      "string.empty": "El nombre es requerido.",
    }),

  apellido: Joi.string()
  .min(3)
  .max(50)
  .required()
  .messages({
    "string.min": "El apellido debe tener al menos 3 caracteres.",
    "string.max": "El apellido no puede exceder los 50 caracteres.",
    "string.empty": "El apellido es requerido.",
  }),

  // Validamos que 'email' sea una dirección de correo electrónico válida y es obligatorio
  email: Joi.string()
    .email()  // El campo debe tener formato de correo electrónico
    .required()  // Campo obligatorio
    .messages({
      "string.email": "El correo electrónico debe ser válido.",
      "string.empty": "El correo electrónico es requerido.",
    }),

  // Validamos que 'contraseña' sea una cadena de texto con al menos 8 caracteres y es obligatorio
  password: Joi.string()
    .min(8)  // La contraseña debe tener al menos 8 caracteres
    .required()  // Campo obligatorio
    .messages({
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.empty": "La contraseña es requerida.",
    }),

  // Validamos que 'direccion' sea una cadena entre 5 y 100 caracteres y es obligatorio
  direccion: Joi.string()
    .min(5)  // La dirección debe tener al menos 5 caracteres
    .max(100)  // La dirección no puede exceder los 100 caracteres
    .required()  // Campo obligatorio
    .messages({
      "string.min": "La dirección debe tener al menos 5 caracteres.",
      "string.max": "La dirección no puede exceder los 100 caracteres.",
      "string.empty": "La dirección es requerida.",
    }),

  // Validamos que 'telefono' sea una cadena con el formato adecuado (puede incluir el prefijo '+' y debe tener entre 7 y 15 dígitos)
  telefono: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/)  // Regex para validación de formato de teléfono
    .required()  // Campo obligatorio
    .messages({
      "string.pattern.base":
        "El teléfono debe ser válido, con un mínimo de 7 y un máximo de 15 dígitos. Puede incluir el prefijo '+' al inicio.",
      "string.empty": "El teléfono es requerido.",
    }),
});

// Exportamos el esquema de validación para que pueda ser utilizado en otras partes del proyecto
module.exports = { userForRegister };
