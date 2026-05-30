import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// Obtener todos los turnos ordenados por fecha y hora
export async function GET() {
  try {
    const rows = await sql`
      SELECT id, service, to_char(date, 'YYYY-MM-DD') AS date, time, client_name AS "clientName", color 
      FROM appointments 
      ORDER BY date ASC, time ASC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener turnos:", error);
    return NextResponse.json({ error: "Error interno al obtener los turnos" }, { status: 500 });
  }
}

// Crear un nuevo turno
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { service, date, time, clientName, color } = body;

    if (!service || !date || !time || !clientName || !color) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    // Insertar turno y retornar el registro insertado
    const result = await sql`
      INSERT INTO appointments (service, date, time, client_name, color)
      VALUES (${service}, ${date}, ${time}, ${clientName}, ${color})
      RETURNING id, service, to_char(date, 'YYYY-MM-DD') AS date, time, client_name AS "clientName", color
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error al crear el turno:", error);
    return NextResponse.json({ error: "Error interno al crear el turno" }, { status: 500 });
  }
}
