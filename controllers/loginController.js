// Importa las funciones del servicio de login y registro
const {
  loginService,
  registerService,
  getAllLoginService,
  getLoginByIdService,
  deleteLoginService,
  UpdateLoginService,
} = require("../services/loginService");

// Importamos la librería para manejar JWT (JSON Web Token)
const jwt = require("jsonwebtoken");

// Importamos los modelos de validación para login
const { login, loginForUpdate, loginForDelete } = require("../models/login");

// Importamos el modelo de validación para el registro de usuario
const { userForRegister } = require("../models/users");
// Controlador para obtener todos los logins
const getAllLogin = async (req, res) => {
  try {
    const response = await getAllLoginService(); // Llama al servicio para obtener todos los logins
    res.json({ response }); // Devuelve la respuesta con los logins
  } catch (error) {
    console.error("Error al intentar obtener los usuarios:", error);
    res.status(500).json({ error: "Error en el servidor" }); // Error del servidor
  }
};

// Controlador para el inicio de sesión
const postLog = async (req, res) => {
  // Desestructuramos los datos enviados en el cuerpo de la solicitud
  const { email, password } = req.body;
  // Validación de los datos de entrada (email y password)
  const { error } = login.validate({ email, password });
  if (error) {
    // Si hay error de validación, respondemos con un mensaje de error 400
    return res.status(400).json({ error: "Datos de entrada no válidos" });
  }
  try {
    // Intentamos realizar el login usando la función del servicio
    const response = await loginService(email, password);
    // Si la respuesta del servicio es exitosa, generamos un JWT (token)
    if (response.status) {
      const token = jwt.sign(
        {
          // El payload del token incluye el ID y el rol del usuario
          id: response.user.ID_USUARIO,
          rol: response.user.ID_ROL,
        },
        process.env.SECRET_KEY, // Usamos una clave secreta definida en .env
        { expiresIn: "2h" } // El token tendrá una validez de 2 horas
      );
      // Respondemos con el token y los datos del usuario
      return res.status(200).json({
        status: true,
        user: response.user,
        access_token: token,
      });
    } else {
      // Si la respuesta del servicio indica error, respondemos con un error 401
      return res.status(401).json({
        status: false,
        message: response.message,
      });
    }
  } catch (err) {
    // En caso de un error en el intento de login, mostramos el error en consola
    console.error("Error en el controlador de login:", err.message);
    // Respondemos con un error genérico del servidor 500
    return res.status(500).json({ message: err.message || "Error en el servidor" });
  }
};

const registerUser = async (req, res) => {
  // Validar el body con Joi y userForRegister
  const { error } = userForRegister.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: false,
      message: "Error de validación",
      details: error.details.map((d) => d.message),
    });
  }
  // Aquí puedes llamar al registerService para guardar el usuario
  const result = await registerService(req.body);
   if (result.status) {
    // Devuelve solo el ID del usuario
    return res.status(201).json({
      status: true,
      id_usuario: result.id_usuario,
    });
  } else {
    return res.status(500).json(result);
  }
};

// Controlador para obtener un usuario por su ID
const getLoginById = async (req, res) => {
  const id_usuario = req.params.id_usuario;

  if (isNaN(id_usuario)) {
    return res.status(400).json({ error: "ID de usuario inválido" });
  }

  try {
    const response = await getLoginByIdService(id_usuario);

    if (!response.status) {
      return res.status(404).json({ error: response.message });
    }

    return res.status(200).json({ user: response.user });
  } catch (error) {
    console.error("Error en el controlador getLoginById:", error.message);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

// Controlador para actualizar login
const UpdateLogin = async (req, res) => {
  // Validamos los datos enviados para la actualización del login
  const { error } = loginForUpdate.validate(req.body);
  if (error) {
    // Si hay error de validación, respondemos con un mensaje de error 400
    return res.status(400).json({ error: error.details[0].message });
  }

  // Extraemos y validamos el ID del usuario desde los parámetros
  const id_usuario = req.params.id_usuario;
  if (isNaN(id_usuario)) {
    // Si el ID no es un número válido, respondemos con error
    return res.status(400).json({ error: "ID de usuario inválido" });
  }

  try {
    // Llamamos al servicio para actualizar el login
    const response = await UpdateLoginService(id_usuario, req.body);
    // Respondemos con un mensaje de éxito
    res.status(200).json({ message: "Login actualizado correctamente", response });
  } catch (error) {
    // Si ocurre un error, lo mostramos en consola y respondemos con 500
    console.error("Error en el controlador de update:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar login
const deleteLogin = async (req, res) => {
  // Validamos que el ID del usuario sea correcto
  const { error } = loginForDelete.validate({ id_usuario: req.params.id_usuario });
  if (error) {
    return res.status(400).json({ error: error });
  }

  try {
    // Llamamos al servicio para eliminar el login
    const response = await deleteLoginService(req.params.id_usuario);
    // Respondemos con un mensaje de éxito
    res.status(200).json({ message: "Login eliminado correctamente", response });
  } catch (error) {
    // Si ocurre un error, lo mostramos en consola y respondemos con 500
    console.error("Error en el controlador de delete:", error.message);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

// Exportamos los controladores para que puedan ser utilizados en otras partes de la aplicación
module.exports = {
  postLog,
  registerUser,
  getAllLogin,
  getLoginById,
  UpdateLogin,
  deleteLogin,
};
