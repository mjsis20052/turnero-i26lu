import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// Eliminar un turno por ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID del turno no provisto" }, { status: 400 });
    }

    const appointmentId = parseInt(id, 10);
    if (isNaN(appointmentId)) {
      return NextResponse.json({ error: "ID de turno inválido" }, { status: 400 });
    }

    await sql`
      DELETE FROM appointments 
      WHERE id = ${appointmentId}
    `;

    return NextResponse.json({ success: true, message: `Turno con ID ${id} eliminado con éxito` });
  } catch (error) {
    console.error("Error al eliminar el turno:", error);
    return NextResponse.json({ error: "Error interno al eliminar el turno" }, { status: 500 });
  }
}
