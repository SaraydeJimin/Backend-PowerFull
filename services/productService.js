const connectDB = require("../config/database");

// Obtener todos los productos con nombre del catálogo
const getAllProductsService = async () => {
  let connection;
  try {
    connection = await connectDB();
    const [products] = await connection.execute(`
      SELECT 
        p.ID_PRODUCTO,
        p.NOMBRE,
        p.DESCRIPCION,
        p.PRECIO,
        p.STOCK,
        p.IMAGEN,
        p.ID_CATALOGO,
        c.NOMBRE AS NOMBRE_CATALOGO
      FROM producto p
      JOIN catalogo c ON p.ID_CATALOGO = c.ID_CATALOGO
    `);
    return products;
  } catch (error) {
    console.error("Error al obtener todos los productos: ", error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();  // Cerramos la conexión
    }
  }
};

// Obtener productos por catálogo
const getProductsByCatalogService = async (id_catalog) => {
  let connection;
  try {
    connection = await connectDB();
    const [products] = await connection.execute(
      "SELECT * FROM producto WHERE ID_CATALOGO = ?", 
      [id_catalog]
    );
    return products;
  } catch (error) {
    console.error("Error al obtener productos por catálogo: ", error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();  // Cerramos la conexión
    }
  }
};

//filtros
const getProductsWithFiltersService = async (filters) => {
  let connection;
  try {
    connection = await connectDB();
    let query = `
      SELECT 
        p.ID_PRODUCTO,
        p.NOMBRE,
        p.DESCRIPCION,
        p.PRECIO,
        p.STOCK,
        p.IMAGEN,
        p.ID_CATALOGO,
        c.NOMBRE AS NOMBRE_CATALOGO
      FROM producto p
      JOIN catalogo c ON p.ID_CATALOGO = c.ID_CATALOGO
      WHERE 1=1
    `;
    const params = [];
    // Filtros dinámicos
    if (filters.name) {
      query += " AND p.NOMBRE LIKE ?";
      params.push(`%${filters.name}%`);
    }
    if (filters.minPrice) {
      query += " AND p.PRECIO >= ?";
      params.push(filters.minPrice);
    }
    if (filters.maxPrice) {
      query += " AND p.PRECIO <= ?";
      params.push(filters.maxPrice);
    }
    if (filters.minStock) {
      query += " AND p.STOCK >= ?";
      params.push(filters.minStock);
    }
    if (filters.maxStock) {
      query += " AND p.STOCK <= ?";
      params.push(filters.maxStock);
    }
    if (filters.id_catalog) {
      query += " AND p.ID_CATALOGO = ?";
      params.push(filters.id_catalog);
    }
    const [products] = await connection.execute(query, params);
    return products;
  } catch (error) {
    console.error("Error al obtener productos con filtros: ", error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Crear un nuevo producto
const createProductService = async (data) => {
  const { id_catalog, name, description, price, stock, image } = data;
  let connection;
  try {
    connection = await connectDB();

    // Validar si ya existe un producto con ese nombre
    const [existing] = await connection.execute(
      "SELECT ID_PRODUCTO FROM producto WHERE NOMBRE = ?",
      [name]
    );
    if (existing.length > 0) {
      throw new Error("Ya existe un producto con ese nombre");
    }

    const [result] = await connection.execute(
      `INSERT INTO producto (ID_CATALOGO, NOMBRE, DESCRIPCION, PRECIO, STOCK, IMAGEN)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_catalog, name, description, price, stock, image]
    );

    return {
      id: result.insertId,
      id_catalog,
      name,
      description,
      price,
      stock,
      image
    };
  } catch (error) {
    console.error("Error en crear producto: ", error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Actualizar producto con validación de nombre único
const updateProductService = async (id, data) => {
  let connection;
  try {
    connection = await connectDB();
    // Primero, obtener producto actual
    const [rows] = await connection.execute(
      "SELECT * FROM producto WHERE ID_PRODUCTO = ?",
      [id]
    );
    if (rows.length === 0) {
      return { status: false, message: "Producto no encontrado" };
    }
    const currentProduct = rows[0];
    // Validar si el nuevo nombre (si cambia) ya está usado por otro producto
    const nameToCheck = data.name ?? currentProduct.NOMBRE;
    if (nameToCheck !== currentProduct.NOMBRE) {
      const [existing] = await connection.execute(
        "SELECT ID_PRODUCTO FROM producto WHERE NOMBRE = ? AND ID_PRODUCTO != ?",
        [nameToCheck, id]
      );
      if (existing.length > 0) {
        return { status: false, message: "Otro producto ya usa ese nombre" };
      }
    }

    // Usar los valores nuevos o los actuales si no vienen
    const id_catalog = data.id_catalog ?? currentProduct.ID_CATALOGO;
    const name = data.name ?? currentProduct.NOMBRE;
    const description = data.description ?? currentProduct.DESCRIPCION;
    const price = data.price ?? currentProduct.PRECIO;
    const stock = data.stock ?? currentProduct.STOCK;
    const image = data.image ?? currentProduct.IMAGEN;
    const [result] = await connection.execute(
      `UPDATE producto
       SET ID_CATALOGO = ?, NOMBRE = ?, DESCRIPCION = ?, PRECIO = ?, STOCK = ?, IMAGEN = ?
       WHERE ID_PRODUCTO = ?`,
      [id_catalog, name, description, price, stock, image, id]
    );
    if (result.affectedRows === 0) {
      return { status: false, message: "Producto no encontrado" };
    }
    return { status: true, message: "Producto actualizado correctamente" };
  } catch (error) {
    console.error("Error en updateProductService:", error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Eliminar producto
const deleteProductService = async (id_producto) => {
  let connection;
  try {
    connection = await connectDB();
    const [result] = await connection.execute(
      "DELETE FROM producto WHERE ID_PRODUCTO = ?", 
      [id_producto]
    );
    if (result.affectedRows === 0) {
      return { status: false, message: "Producto no encontrado o ya eliminado" };
    }
    return { status: true, message: "Producto eliminado correctamente" };
  } catch (error) {
    console.error("Error en deleteProductService:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Actualizar stock de producto
const updateProductStockService = async (id_producto, cantidad) => {
  let connection;
  try {
    connection = await connectDB();
    const [result] = await connection.execute(
      `UPDATE producto SET STOCK = STOCK - ? WHERE ID_PRODUCTO = ? AND STOCK >= ?`,
      [cantidad, id_producto, cantidad]
    );
    if (result.affectedRows === 0) {
      throw new Error("Stock insuficiente para reducción");
    }
    const [rows] = await connection.execute(
      `SELECT STOCK FROM producto WHERE ID_PRODUCTO = ?`,
      [id_producto]
    );
    return rows[0]?.STOCK ?? null;
  } catch (error) {
    throw error; 
  } finally {
    if (connection) await connection.end();
  }
};

const verificarStockService = async (detalles) => {
  console.log('🧪 DETALLES EN SERVICE:', detalles, 'Es array:', Array.isArray(detalles));
  let connection;
  try {
    connection = await connectDB();

    for (const detalle of detalles) {
      const [rows] = await connection.execute(
        `SELECT STOCK FROM producto WHERE ID_PRODUCTO = ?`,
        [detalle.id_producto]
      );
      const stockActual = rows[0]?.STOCK ?? 0;
      if (detalle.cantidad > stockActual) {
        throw new Error(
          `Stock insuficiente para el producto ID ${detalle.id_producto}. Disponible: ${stockActual}`
        );
      }
    }
    return true; // todo OK
  } catch (error) {
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

module.exports = {
  getAllProductsService,
  getProductsByCatalogService,
  getProductsWithFiltersService,
  createProductService,
  updateProductService,
  deleteProductService,
    updateProductStockService,
  verificarStockService

};
