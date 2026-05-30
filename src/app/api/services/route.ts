import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// Obtener los servicios disponibles en la base de datos
export async function GET() {
  try {
    const rows = await sql`
      SELECT id, name, duration, price, color 
      FROM services 
      ORDER BY id ASC
    `;
    
    // Si la tabla está vacía, retornamos los servicios por defecto
    if (rows.length === 0) {
      return NextResponse.json(DEFAULT_SERVICES);
    }
    
    return NextResponse.json(rows);
  } catch (error) {
    console.warn("No se pudo leer de la tabla 'services'. Retornando datos estáticos de respaldo:", error);
    return NextResponse.json(DEFAULT_SERVICES);
  }
}

const DEFAULT_SERVICES = [
  { id: "srv-1", name: "Asesoría de Negocios", duration: "45 min", price: "$45", color: "from-blue-500 to-indigo-600" },
  { id: "srv-2", name: "Desarrollo Web & UX", duration: "60 min", price: "$80", color: "from-purple-500 to-pink-600" },
  { id: "srv-3", name: "Mentoría 1-a-1 Tech", duration: "30 min", price: "$30", color: "from-emerald-400 to-teal-600" },
];
