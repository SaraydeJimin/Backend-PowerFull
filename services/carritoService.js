const connectDB = require("../config/database");

// Ver el carrito por usuario
const getCarritoByUserService = async (id_usuario) => {
  let connection;
  try {
    connection = await connectDB();

    const resultUsuario = await connection.query(
      "SELECT id_usuario FROM usuario WHERE id_usuario = $1",
      [id_usuario]
    );

    if (resultUsuario.rows.length === 0) {
      console.error(`El usuario con ID ${id_usuario} no existe.`);
      return [];
    }

    const resultCarrito = await connection.query(
      "SELECT * FROM carrito WHERE id_usuario = $1",
      [id_usuario]
    );

    return resultCarrito.rows;
  } catch (error) {
    console.error("Error al obtener el usuario del carrito: ", error.message);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

// Ver los carritos activos del usuario
const getActiveCarritoByUserService = async (id_usuario) => {
  let connection;
  try {
    connection = await connectDB();

    const result = await connection.query(
      "SELECT * FROM carrito WHERE id_usuario = $1 AND activo = 1",
      [id_usuario]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error("Error al obtener el carrito activo:", error.message);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

// Servicio para crear un carrito
const createCarritoService = async (carrito) => {
  const connection = await connectDB();
  try {
    const resultExisting = await connection.query(
      "SELECT * FROM carrito WHERE id_usuario = $1 AND activo = 1",
      [carrito.id_usuario]
    );

    if (resultExisting.rows.length > 0) {
      return {
        status: false,
        message: "Ya existe un carrito activo",
        carrito: resultExisting.rows[0]
      };
    }

    const result = await connection.query(
      "INSERT INTO carrito (id_usuario, fecha_creacion, activo) VALUES ($1, $2, 1) RETURNING *",
      [carrito.id_usuario, carrito.fecha_creacion]
    );

    if (result.rows.length === 1) {
      return {
        status: true,
        message: "Carrito creado exitosamente",
        carrito: result.rows[0]
      };
    } else {
      return {
        status: false,
        message: "No se pudo crear el carrito"
      };
    }
  } catch (error) {
    console.error("Error en createCarritoService:", error.message);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

module.exports = {
  getCarritoByUserService,
  createCarritoService,
  getActiveCarritoByUserService
};
