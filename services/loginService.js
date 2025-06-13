const bcrypt = require("bcryptjs");
const connectDB = require("../config/database");

// Función para login
const loginService = async (email, password) => {
  try {
    const client = await connectDB();
    const result = await client.query(
      `SELECT * FROM usuario WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      await client.end();
      return { status: false, message: "Usuario no encontrado" };
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.contraseña);

    await client.end();

    if (!validPassword) {
      return { status: false, message: "Contraseña incorrecta" };
    }

    return {
      status: true,
      user: {
        id_usuario: user.id_usuario,
        id_rol: user.id_rol,
        documento: user.documento,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        direccion: user.direccion,
        telefono: user.telefono,
      },
    };
  } catch (error) {
    console.error("Error en loginService:", error.message);
    return { status: false, message: error.message };
  }
};

const getAllLoginService = async () => {
  try {
    const client = await connectDB();
    const result = await client.query(
      "SELECT * FROM usuario WHERE id_rol = 2"
    );
    await client.end();
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error.message);
    throw error;
  }
};

const registerService = async (user) => {
  try {
    const client = await connectDB();
    const check = await client.query(
      `SELECT * FROM usuario WHERE email = $1 OR documento = $2 OR telefono = $3`,
      [user.email, user.documento, user.telefono]
    );

    if (check.rows.length > 0) {
      await client.end();
      return {
        status: false,
        message: "Email, documento o teléfono ya registrado",
      };
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const insert = await client.query(
      `INSERT INTO usuario (id_rol, documento, nombre, apellido, email, contraseña, direccion, telefono)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_usuario`,
      [
        user.id_rol,
        user.documento,
        user.nombre,
        user.apellido,
        user.email,
        hashedPassword,
        user.direccion,
        user.telefono,
      ]
    );

    await client.end();

    return {
      status: true,
      message: "Usuario registrado exitosamente",
      id_usuario: insert.rows[0].id_usuario,
    };
  } catch (error) {
    console.error("Error en registerService:", error.message);
    return {
      status: false,
      message: error.message || "Error interno del servidor",
    };
  }
};

const getLoginByIdService = async (id_usuario) => {
  try {
    const client = await connectDB();
    const result = await client.query(
      `SELECT documento, nombre, apellido, email, direccion, telefono FROM usuario WHERE id_usuario = $1`,
      [id_usuario]
    );
    await client.end();

    if (result.rows.length === 0) {
      return { status: false, message: "Usuario no encontrado" };
    }

    return { status: true, user: result.rows[0] };
  } catch (error) {
    console.error("Error en getLoginByIdService:", error.message);
    throw error;
  }
};

const deleteLoginService = async (id_usuario) => {
  try {
    const client = await connectDB();
    const result = await client.query(
      `DELETE FROM usuario WHERE id_usuario = $1`,
      [id_usuario]
    );
    await client.end();

    if (result.rowCount === 1) {
      return { status: true, message: "Cuenta eliminada exitosamente" };
    } else {
      return { status: false, message: "No se encontró la cuenta a eliminar" };
    }
  } catch (error) {
    console.error("Error en deleteLoginService:", error.message);
    throw error;
  }
};

const UpdateLoginService = async (id_usuario, data) => {
  try {
    const client = await connectDB();

    const userResult = await client.query(
      `SELECT * FROM usuario WHERE id_usuario = $1`,
      [id_usuario]
    );

    if (userResult.rows.length === 0) {
      client.release();
      return { status: false, message: "El usuario no existe" };
    }

    if (!data.password || data.password.trim() === "") {
      client.release();
      return { status: false, message: "La contraseña es obligatoria" };
    }

    const existing = await client.query(
      `SELECT * FROM usuario 
       WHERE (email = $1 OR documento = $2 OR telefono = $3) 
       AND id_usuario != $4`,
      [data.email, data.documento, data.telefono, id_usuario]
    );

    if (existing.rows.length > 0) {
      await client.end();
      return {
        status: false,
        message: "El email, documento o teléfono ya está en uso por otro usuario",
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await client.query(
      `UPDATE usuario SET 
        documento = $1,
        nombre = $2,
        apellido = $3,
        email = $4, 
        contraseña = $5, 
        direccion = $6, 
        telefono = $7
       WHERE id_usuario = $8`,
      [
        data.documento,
        data.nombre,
        data.apellido,
        data.email,
        hashedPassword,
        data.direccion,
        data.telefono,
        id_usuario,
      ]
    );

    await client.end();

    return {
      status: true,
      message: "Usuario actualizado correctamente",
    };
  } catch (error) {
    console.error("Error en UpdateLoginService:", error.message);
    throw error;
  }
};

module.exports = {
  loginService,
  getAllLoginService,
  registerService,
  getLoginByIdService,
  deleteLoginService,
  UpdateLoginService,
};
