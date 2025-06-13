const connectDB = require("../config/database");

// Obtener todos los productos con nombre del catálogo
const getAllProductsService = async () => {
  const client = await connectDB();
  try {
    const result = await client.query(`
      SELECT 
        p.id_producto,
        p.nombre,
        p.descripcion,
        p.precio,
        p.stock,
        p.imagen,
        p.id_catalogo,
        c.nombre AS nombre_catalogo
      FROM producto p
      JOIN catalogo c ON p.id_catalogo = c.id_catalogo
    `);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener todos los productos: ", error.message);
    throw error;
  } finally {
    await client.end();
  }
};

const getProductsByCatalogService = async (id_catalogo) => {
  const client = await connectDB();
  try {
    const result = await client.query(
      "SELECT * FROM producto WHERE id_catalogo = $1",
      [id_catalogo]
    );
    return result.rows;
  } catch (error) {
    console.error("Error al obtener productos por catálogo: ", error.message);
    throw error;
  } finally {
    await client.end();
  }
};

const getProductsWithFiltersService = async (filters) => {
  const client = await connectDB();
  try {
    let query = `
      SELECT 
        p.id_producto,
        p.nombre,
        p.descripcion,
        p.precio,
        p.stock,
        p.imagen,
        p.id_catalogo,
        c.nombre AS nombre_catalogo
      FROM producto p
      JOIN catalogo c ON p.id_catalogo = c.id_catalogo
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (filters.name) {
      query += ` AND p.nombre ILIKE $${paramIndex++}`;
      params.push(`%${filters.name}%`);
    }
    if (filters.minPrice) {
      query += ` AND p.precio >= $${paramIndex++}`;
      params.push(filters.minPrice);
    }
    if (filters.maxPrice) {
      query += ` AND p.precio <= $${paramIndex++}`;
      params.push(filters.maxPrice);
    }
    if (filters.minStock) {
      query += ` AND p.stock >= $${paramIndex++}`;
      params.push(filters.minStock);
    }
    if (filters.maxStock) {
      query += ` AND p.stock <= $${paramIndex++}`;
      params.push(filters.maxStock);
    }
    if (filters.id_catalogo) {
      query += ` AND p.id_catalogo = $${paramIndex++}`;
      params.push(filters.id_catalogo);
    }

    const result = await client.query(query, params);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener productos con filtros: ", error.message);
    throw error;
  } finally {
    await client.end();
  }
};

const createProductService = async (data) => {
  const { id_catalogo, name, description, price, stock, image } = data;
  const client = await connectDB();
  try {
    const existing = await client.query(
      "SELECT id_producto FROM producto WHERE nombre = $1",
      [name]
    );
    if (existing.rows.length > 0) {
      throw new Error("Ya existe un producto con ese nombre");
    }

    const result = await client.query(
      `INSERT INTO producto (id_catalogo, nombre, descripcion, precio, stock, imagen)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_producto`,
      [id_catalogo, name, description, price, stock, image]
    );

    // Obtener el nombre del catálogo
    const catResult = await client.query(
      `SELECT nombre FROM catalogo WHERE id_catalogo = $1`,
      [id_catalogo]
    );
    const nombre_catalogo = catResult.rows[0]?.nombre ?? "";

    return {
      id: result.rows[0].id_producto,
      id_catalogo,
      nombre_catalogo,
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
    await client.end();
  }
};

const updateProductService = async (id, data) => {
  const client = await connectDB();
  try {
    const result = await client.query(
      "SELECT * FROM producto WHERE id_producto = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return { status: false, message: "Producto no encontrado" };
    }

    const currentProduct = result.rows[0];
    const nameToCheck = data.name ?? currentProduct.nombre;

    if (nameToCheck !== currentProduct.nombre) {
      const existing = await client.query(
        "SELECT id_producto FROM producto WHERE nombre = $1 AND id_producto != $2",
        [nameToCheck, id]
      );
      if (existing.rows.length > 0) {
        return { status: false, message: "Otro producto ya usa ese nombre" };
      }
    }

    const id_catalogo = data.id_catalogo ?? currentProduct.id_catalogo;
    const name = data.name ?? currentProduct.nombre;
    const description = data.description ?? currentProduct.descripcion;
    const price = data.price ?? currentProduct.precio;
    const stock = data.stock ?? currentProduct.stock;
    const image = data.image ?? currentProduct.imagen;

    const updateResult = await client.query(
      `UPDATE producto
       SET id_catalogo = $1, nombre = $2, descripcion = $3, precio = $4, stock = $5, imagen = $6
       WHERE id_producto = $7`,
      [id_catalogo, name, description, price, stock, image, id]
    );

    if (updateResult.rowCount === 0) {
      return { status: false, message: "Producto no encontrado" };
    }

    return { status: true, message: "Producto actualizado correctamente" };
  } catch (error) {
    console.error("Error en updateProductService:", error.message);
    throw error;
  } finally {
    await client.end();
  }
};

const deleteProductService = async (id_producto) => {
  const client = await connectDB();
  try {
    const result = await client.query(
      "DELETE FROM producto WHERE id_producto = $1",
      [id_producto]
    );
    if (result.rowCount === 0) {
      return { status: false, message: "Producto no encontrado o ya eliminado" };
    }
    return { status: true, message: "Producto eliminado correctamente" };
  } catch (error) {
    console.error("Error en deleteProductService:", error.message);
    throw error;
  } finally {
    await client.end();
  }
};

const updateProductStockService = async (id_producto, cantidad) => {
  const client = await connectDB();
  try {
    const result = await client.query(
      `UPDATE producto SET stock = stock - $1 WHERE id_producto = $2 AND stock >= $3`,
      [cantidad, id_producto, cantidad]
    );
    if (result.rowCount === 0) {
      throw new Error("Stock insuficiente para reducción");
    }
    const res = await client.query(
      `SELECT stock FROM producto WHERE id_producto = $1`,
      [id_producto]
    );
    return res.rows[0]?.stock ?? null;
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
};

const verificarStockService = async (detalles) => {
  console.log('🧪 DETALLES EN SERVICE:', detalles, 'Es array:', Array.isArray(detalles));
  const client = await connectDB();
  try {
    for (const detalle of detalles) {
      const res = await client.query(
        `SELECT stock FROM producto WHERE id_producto = $1`,
        [detalle.id_producto]
      );
      const stockActual = res.rows[0]?.stock ?? 0;
      if (detalle.cantidad > stockActual) {
        throw new Error(
          `Stock insuficiente para el producto ID ${detalle.id_producto}. Disponible: ${stockActual}`
        );
      }
    }
    return true;
  } catch (error) {
    throw error;
  } finally {
    await client.end();
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
