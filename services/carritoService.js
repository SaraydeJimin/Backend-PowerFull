const connectDB = require("../config/database");

//ver el carrito por usuario
const getCarritoByUserService = async (id_usuario) => {
  let connection;
  try {
    connection = await connectDB();
    const [carritoExist] = await connection.execute(
      "SELECT ID_USUARIO FROM usuario WHERE ID_USUARIO = ?",
      [id_usuario]
    );
    if (carritoExist.length === 0) {
      console.error(`El usuario con ID ${id_usuario} no existe.`);
      return [];
    }
    const [carrito] = await connection.execute(
      "SELECT * FROM carrito WHERE ID_USUARIO = ?",
      [id_usuario]
    );
    return carrito;
  } catch (error) {
    console.error("Error al obtener el usuario del carrito: ", error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

//ver los carritos activos del usuario
const getActiveCarritoByUserService = async (id_usuario) => {
  let connection;
  try {
    connection = await connectDB();
    const [rows] = await connection.execute(
      "SELECT * FROM carrito WHERE ID_USUARIO = ? AND ACTIVO = 1",
      [id_usuario]
    );
    return rows[0] || null;
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
    // Verificar si ya hay un carrito activo
    const [existing] = await connection.execute(
      "SELECT * FROM carrito WHERE ID_USUARIO = ? AND ACTIVO = 1",
      [carrito.id_usuario]
    );
    if (existing.length > 0) {
      return { status: false, message: "Ya existe un carrito activo", carrito: existing[0] };
    }
    // Crear nuevo carrito si no existe uno activo
    const result = await connection.execute(
      `INSERT INTO carrito (ID_USUARIO, FECHA_CREACION, ACTIVO) VALUES (?, ?, 1)`,
      [carrito.id_usuario, carrito.fecha_creacion]
    );
    if (result[0].affectedRows === 1) {
      return { status: true, message: "Carrito creado exitosamente" };
    } else {
      return { status: false, message: "No se pudo crear el carrito" };
    }
  } catch (error) {
    console.error("Error en createCarritoService:", error.message);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

module.exports = { getCarritoByUserService, createCarritoService, getActiveCarritoByUserService };
