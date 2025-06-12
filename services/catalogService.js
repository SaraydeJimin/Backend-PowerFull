const connectDB = require("../config/database");

//ver todos los catalogos
const getAllCatalogService = async () => {
  try {
    const connection = await connectDB();
    const [catalog] = await connection.execute("SELECT * FROM catalogo");
    return catalog;
  } catch (error) {
    console.error("Error al obtener el catalogo: ", error.message);
    throw error;
  }
};

//ver los catalogos por el nombre
const getCatalogByNameService = async (nombre) => {
    let connection;
    try {
      connection = await connectDB();
      const [nombreExist] = await connection.execute(
        "SELECT * FROM catalogo WHERE NOMBRE = ?",
        [nombre]
      );
      return nombreExist;
    } catch (error) {
      console.error("Error al obtener el catalogo por nombre: ", error.message);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  };
  

// Servicio para crear un nuevo catalogo
const createCatalogService = async (catalog) => {
  let connection;
  try {
    connection = await connectDB();
    // Validar que NO exista otro catálogo con ese nombre
    const [existing] = await connection.execute(
      "SELECT ID_CATALOGO FROM catalogo WHERE NOMBRE = ?",
      [catalog.nombre]
    );
    if (existing.length > 0) {
      return { status: false, message: "Ya existe un catálogo con ese nombre" };
    }
    // Si no existe, crea el catálogo
    const [result] = await connection.execute(
      `INSERT INTO catalogo (NOMBRE, DESCRIPCION) VALUES (?, ?)`,
      [catalog.nombre, catalog.descripcion]
    );
    return {
      status: result.affectedRows === 1,
      message: result.affectedRows === 1
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

//aactualizar el catalogo
const updateCatalogService = async (id, updatedData) => {
  let connection;
  try {
    connection = await connectDB();
    // Validar existencia del catálogo directamente aquí
    const [existCatalog] = await connection.execute(
      "SELECT ID_CATALOGO FROM catalogo WHERE ID_CATALOGO = ?",
      [id]
    );
    if (existCatalog.length === 0) {
      return { status: false, message: "El catálogo no existe" };
    }
    // Validar si el nombre ya existe en otro catálogo
    const [nameExists] = await connection.execute(
      "SELECT ID_CATALOGO FROM catalogo WHERE NOMBRE = ? AND ID_CATALOGO != ?",
      [updatedData.nombre, id]
    );
    if (nameExists.length > 0) {
      return { status: false, message: "Ya existe otro catálogo con ese nombre" };
    }
    const [result] = await connection.execute(
      `UPDATE catalogo SET NOMBRE = ?, DESCRIPCION = ? WHERE ID_CATALOGO = ?`,
      [updatedData.nombre, updatedData.descripcion, id]
    );
    return {
      status: result.affectedRows > 0,
      message: result.affectedRows > 0
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

//eliminar catalogo
const deleteCatalogService = async (id) => {
  let connection;
  try {
    connection = await connectDB();
    // Validar existencia del catálogo antes de eliminar
    const [existCatalog] = await connection.execute(
      "SELECT ID_CATALOGO FROM catalogo WHERE ID_CATALOGO = ?",
      [id]
    );
    if (existCatalog.length === 0) {
      return { status: false, message: "El catálogo no existe" };
    }
    const [result] = await connection.execute(
      `DELETE FROM catalogo WHERE ID_CATALOGO = ?`,
      [id]
    );
    return {
      status: result.affectedRows === 1,
      message: result.affectedRows === 1
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

module.exports = { getAllCatalogService, getCatalogByNameService, createCatalogService, deleteCatalogService, updateCatalogService };
