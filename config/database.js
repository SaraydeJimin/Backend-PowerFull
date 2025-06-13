require('dotenv').config();
const { Client } = require('pg'); // ✅ usamos Client, no connectDB ni Connection

const connectDB = async () => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();
    console.log("Conexión exitosa a la base de datos PostgreSQL.");
    return client;
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err.message);
    throw err;
  }
};

module.exports = connectDB;
