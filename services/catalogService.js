const connectDB = require("../config/database");

// Ver todos los catálogos
const getAllCatalogService = async () => {
  let connection;
  try {
    connection = await connectDB();
    const result = await connection.query("SELECT * FROM catalogo");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener el catálogo: ", error.message);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

// Ver los catálogos por el nombre
const getCatalogByNameService = async (nombre) => {
  let connection;
  try {
    connection = await connectDB();
    const result = await connection.query(
      "SELECT * FROM catalogo WHERE NOMBRE = $1",
      [nombre]
    );
    return result.rows;
  } catch (error) {
    console.error("Error al obtener el catálogo por nombre: ", error.message);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

// Crear un nuevo catálogo
const createCatalogService = async (catalog) => {
  let connection;
  try {
    connection = await connectDB();
    const exist = await connection.query(
      "SELECT ID_CATALOGO FROM catalogo WHERE NOMBRE = $1",
      [catalog.nombre]
    );
    if (exist.rows.length > 0) {
      return { status: false, message: "Ya existe un catálogo con ese nombre" };
    }

    const result = await connection.query(
      "INSERT INTO catalogo (NOMBRE, DESCRIPCION) VALUES ($1, $2)",
      [catalog.nombre, catalog.descripcion]
    );

    return {
      status: result.rowCount === 1,
      message: result.rowCount === 1
        ? "Catálogo registrado exitosamente"
        : "No se pudo registrar el catálogo",
    };
  } catch (error) {
    console.error("Error en createCatalogService:", error.message);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

// Actualizar un catálogo
const updateCatalogService = async (id, updatedData) => {
  let connection;
  try {
    connection = await connectDB();

    const exist = await connection.query(
      "SELECT ID_CATALOGO FROM catalogo WHERE ID_CATALOGO = $1",
      [id]
    );
    if (exist.rows.length === 0) {
      return { status: false, message: "El catálogo no existe" };
    }

    const nameExists = await connection.query(
      "SELECT ID_CATALOGO FROM catalogo WHERE NOMBRE = $1 AND ID_CATALOGO != $2",
      [updatedData.nombre, id]
    );
    if (nameExists.rows.length > 0) {
      return { status: false, message: "Ya existe otro catálogo con ese nombre" };
    }

    const result = await connection.query(
      "UPDATE catalogo SET NOMBRE = $1, DESCRIPCION = $2 WHERE ID_CATALOGO = $3",
      [updatedData.nombre, updatedData.descripcion, id]
    );

    return {
      status: result.rowCount > 0,
      message: result.rowCount > 0
        ? "Catálogo actualizado exitosamente"
        : "No se pudo actualizar el catálogo"
    };
  } catch (error) {
    console.error("Error en updateCatalogService:", error.message);
    throw new Error("Error al actualizar el catálogo");
  } finally {
    if (connection) await connection.end();
  }
};

// Eliminar un catálogo
const deleteCatalogService = async (id) => {
  let connection;
  try {
    connection = await connectDB();

    const exist = await connection.query(
      "SELECT ID_CATALOGO FROM catalogo WHERE ID_CATALOGO = $1",
      [id]
    );
    if (exist.rows.length === 0) {
      return { status: false, message: "El catálogo no existe" };
    }

    const result = await connection.query(
      "DELETE FROM catalogo WHERE ID_CATALOGO = $1",
      [id]
    );

    return {
      status: result.rowCount === 1,
      message: result.rowCount === 1
        ? "Catálogo eliminado exitosamente"
        : "No se pudo eliminar el catálogo"
    };
  } catch (error) {
    console.error("Error en deleteCatalogService:", error.message);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

module.exports = {
  getAllCatalogService,
  getCatalogByNameService,
  createCatalogService,
  deleteCatalogService,
  updateCatalogService,
};
