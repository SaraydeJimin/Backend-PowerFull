// Importamos bcrypt para el manejo de contraseñas seguras mediante hash
const bcrypt = require("bcrypt");

// Importamos la función para conectar a la base de datos
const connectDB = require("../config/database");

// Función para el login del usuario
const loginService = async (email, password) => {
  try {
    // Establecemos la conexión a la base de datos
    const connection = await connectDB();
    // Buscamos al usuario por su correo electrónico
    const [rows] = await connection.execute(
      `SELECT * FROM usuario WHERE EMAIL = ?`,
      [email]
    );
    // Si no se encuentra el usuario, retornamos un mensaje de error
    if (rows.length === 0) {
      return { status: false, message: "Usuario no encontrado" };
    }
    // Obtenemos el primer usuario encontrado
    const user = rows[0];
    // Comparamos la contraseña proporcionada con la almacenada en la base de datos
    const validPassword = await bcrypt.compare(password, user.CONTRASEÑA);
    // Si la contraseña no coincide, retornamos error
    if (!validPassword) {
      return { status: false, message: "Contraseña incorrecta" };
    }
    // Si la autenticación es exitosa, retornamos los datos del usuario
    return {
      user: {
        ID_USUARIO: user.ID_USUARIO,
        ID_ROL: user.ID_ROL,
        DOCUEMENTO: user.DOCUMENTO,
        NOMBRE: user.NOMBRE,
        APELLIDO: user.APELLIDO,
        EMAIL: user.EMAIL,
        DIRECCION: user.DIRECCION,
        TELEFONO: user.TELEFONO,
      },
      status: true,
    };
  } catch (error) {
    console.error("Error en loginService:", error.message);
    throw error;
  }
};

// Función para obtener todos los usuarios con ID_ROL = 2 (clientes)
const getAllLoginService = async () => {
  let connection;
  try {
    connection = await connectDB();
    const [login] = await connection.execute("SELECT * FROM usuario WHERE ID_ROL = 2");
    return login;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error.message);
    throw error;
  } finally {
    // Cerramos la conexión en cualquier caso
    if (connection) await connection.end();
  }
};

// Función para registrar un nuevo usuario
const registerService = async (user) => {
  try {
    // Establecemos conexión con la base de datos
    const connection = await connectDB();
    // Validamos que no exista otro usuario con el mismo EMAIL, DOCUMENTO o TELEFONO
    // para evitar duplicados y mantener la integridad de los datos.
    const [existing] = await connection.execute(
      `SELECT * FROM usuario WHERE EMAIL = ? OR DOCUMENTO = ? OR TELEFONO = ?`,
      [user.email, user.documento, user.telefono]
    );
    // Si ya existe un usuario con alguno de esos datos, devolvemos error
    if (existing.length > 0) {
      return {
        status: false,
        message: "Email, documento o teléfono ya registrado"
      };
    }
    // Encriptamos la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(user.password, 10); // 10 saltos para más seguridad
    // Insertamos el nuevo usuario con los datos proporcionados, incluyendo la contraseña encriptada
    const [result] = await connection.execute(
      `INSERT INTO usuario (ID_ROL, DOCUMENTO, NOMBRE, APELLIDO, EMAIL, CONTRASEÑA, DIRECCION, TELEFONO) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
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
    // Si la inserción fue exitosa, devolvemos el estado true y el ID generado para el usuario
    if (result.affectedRows === 1) {
      return {
        status: true,
        message: "Usuario registrado exitosamente",
        id_usuario: result.insertId
      };
    } else {
      // Si no se insertó, indicamos el fallo
      return {
        status: false,
        message: "No se pudo registrar el usuario"
      };
    }
  } catch (error) {
    // Capturamos cualquier error inesperado y lo mostramos en consola
    console.error("Error en registerService:", error.stack || error);
    return {
      status: false,
      message: error.message || "Error interno del servidor"
    };
  }
};

// Función para obtener un usuario por su ID
const getLoginByIdService = async (id_usuario) => {
  let connection;
  try {
    connection = await connectDB();
    // Consulta para buscar al usuario por ID
    const [rows] = await connection.execute(
      `SELECT DOCUMENTO, NOMBRE, APELLIDO, EMAIL, DIRECCION, TELEFONO 
       FROM usuario WHERE ID_USUARIO = ?`,
      [id_usuario]
    );
    if (rows.length === 0) {
      return { status: false, message: "Usuario no encontrado" };
    }
    // Retornamos el usuario encontrado
    return { status: true, user: rows[0] };
  } catch (error) {
    console.error("Error en getLoginByIdService:", error.message);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

// Función para eliminar un usuario por su ID
const deleteLoginService = async (id_usuario) => {
  try {
    const connection = await connectDB();
    // Ejecutamos la consulta de eliminación
    const result = await connection.execute(
      `DELETE FROM usuario WHERE ID_USUARIO = ?`,
      [id_usuario]
    );
    // Verificamos si se eliminó correctamente
    if (result[0].affectedRows === 1) {
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
  let connection;
  try {
    connection = await connectDB();
    // Verificar que el usuario existe
    const [user] = await connection.execute(
      "SELECT * FROM usuario WHERE ID_USUARIO = ?",
      [id_usuario]
    );
    if (user.length === 0) {
      throw new Error("El usuario no existe");
    }
    // Validar que la contraseña no esté vacía
    if (!data.password || data.password.trim() === "") {
      throw new Error("La contraseña es obligatoria");
    }
    // Validar que email, documento o teléfono no estén repetidos en otros usuarios
    const [existing] = await connection.execute(
      `SELECT * FROM usuario 
       WHERE (EMAIL = ? OR DOCUMENTO = ? OR TELEFONO = ?) 
       AND ID_USUARIO != ?`,
      [data.email, data.documento, data.telefono, id_usuario]
    );
    if (existing.length > 0) {
      throw new Error("El email, documento o teléfono ya está en uso por otro usuario");
    }
    // Encriptar la contraseña nueva
    const hashedPassword = await bcrypt.hash(data.password, 10);
    // Actualizar los datos del usuario
    const [result] = await connection.execute(
      `UPDATE usuario SET 
        DOCUMENTO = ?,
        NOMBRE = ?,
        APELLIDO = ?,
        EMAIL = ?, 
        CONTRASEÑA = ?, 
        DIRECCION = ?, 
        TELEFONO = ?
       WHERE ID_USUARIO = ?`,
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
    return {
      status: true,
      message: "Usuario actualizado correctamente",
      result,
    };
  } catch (error) {
    console.error("Error en UpdateLoginService:", error.message);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

// Exportamos las funciones para su uso en controladores u otras partes del sistema
module.exports = {
  loginService,
  getAllLoginService,
  registerService,
  getLoginByIdService,
  deleteLoginService,
  UpdateLoginService
};
