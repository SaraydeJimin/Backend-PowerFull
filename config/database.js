require("dotenv").config();
const { Pool } = require("pg");

const connectDB = async () => {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Necesario para Render
      },
    });

    await pool.query("SELECT NOW()");
    console.log("Conexión exitosa a la base de datos PostgreSQL.");

    return pool;
  } catch (error) {
    console.error("Error conectando a la base de datos PostgreSQL:", error.message);
    throw error;
  }
};

module.exports = connectDB;
