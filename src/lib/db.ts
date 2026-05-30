import { neon } from "@neondatabase/serverless";

// Inicializa el cliente HTTP de Neon utilizando la URL de la base de datos de .env.local
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL no está definida en las variables de entorno.");
}

export const sql = neon(connectionString);
export default sql;
