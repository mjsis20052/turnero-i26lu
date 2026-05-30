import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  const startTime = Date.now();
  try {
    // Realizamos una consulta simple para verificar la conectividad
    const result = await sql`SELECT NOW() AS db_time, version() AS db_version`;
    const latency = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message: "Conexión a Neon PostgreSQL establecida correctamente.",
      latencyMs: latency,
      dbTime: result[0].db_time,
      dbVersion: result[0].db_version,
    });
  } catch (error: any) {
    console.error("Error en la prueba de conexión a la base de datos:", error);
    return NextResponse.json(
      {
        success: false,
        message: "No se pudo conectar a la base de datos.",
        error: error.message || String(error),
      },
      { status: 500 }
    );
  }
}
