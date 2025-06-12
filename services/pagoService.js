const connectDB = require("../config/database");

//crear pago
const createPagoService = async (pago) => {
  try {
    const connection = await connectDB();
    const [result] = await connection.execute(
      `INSERT INTO pago 
      (ID_USUARIO, FECHA_PAGO, METODO_PAGO, NOMBRE_TARJETA, NUMERO_TARJETA, FECHA_EXPEDICION) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        pago.id_usuario,
        pago.fecha_pago,
        pago.metodo_pago,
        pago.nombre_tarjeta ?? null,
        pago.numero_tarjeta ?? null,
        pago.fecha_expedicion ?? null
      ]
    );
    if (result.affectedRows === 1) {
      return { 
        status: true, 
        message: "Pago registrado exitosamente",
        id_pago: result.insertId  
      };
    } else {
      return { status: false, message: "No se pudo registrar el pago" };
    }
  } catch (error) {
    console.error("Error en pagoService:", error.message);
    throw error;
  }
};

module.exports = { createPagoService };