import type { Context } from 'hono';
import { prisma } from "@connections/";
import { getAppointmentsByDateRange } from './database';

export async function uploadController(context: any) {
  const data = await prisma.resource.findMany();
  return context.json({ success: true, data  }, 200);
}

export async function getAppointmentsByDateRangeController(context: Context) {
  try {
    // Obtener parámetros de la query string
    const { startDate, endDate } = context.req.query();

    // Validar que los parámetros existan
    if (!startDate || !endDate) {
      return context.json({
        success: false,
        error: 'Los parámetros startDate y endDate son requeridos'
      }, 400);
    }

    // Convertir a objetos Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validar que las fechas sean válidas
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return context.json({
        success: false,
        error: 'Las fechas proporcionadas no son válidas'
      }, 400);
    }

    // Validar que startDate sea menor o igual a endDate
    if (start > end) {
      return context.json({
        success: false,
        error: 'startDate debe ser menor o igual a endDate'
      }, 400);
    }

    // Obtener las citas del rango de fechas
    const appointments = await getAppointmentsByDateRange(start, end);

    // Formatear la respuesta
    const formattedAppointments = (appointments as any[]).map((appointment: any) => ({
      id: appointment.id,
      startsAt: appointment.startsAt,
      endsAt: appointment.endsAt,
      metadata: appointment.metadata,
      notes: appointment.notes,
      clientNote: appointment.clientNote,
      clientId: appointment.userId,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
      user: appointment.user ? {
        id: appointment.user.id,
        email: appointment.user.email,
        phone: appointment.user.phone,
        name: appointment.user.name,
        surName: appointment.user.surName,
        fullName: `${appointment.user.name} ${appointment.user.surName}`.trim(),
        active: appointment.user.active
      } : null,
      resource: appointment.resource ? {
        id: appointment.resource.id,
        name: appointment.resource.name,
        type: appointment.resource.type,
        bio: appointment.resource.bio,
        photoUrl: appointment.resource.photoUrl,
        isActive: appointment.resource.isActive
      } : null,
      service: appointment.service ? {
        id: appointment.service.id,
        name: appointment.service.name,
        durationMinutes: appointment.service.durationMinutes,
        price: appointment.service.price,
        description: appointment.service.description
      } : null,
      status: appointment.status ? {
        id: appointment.status.id,
        name: appointment.status.name
      } : null,
      branch: appointment.branch ? {
        id: appointment.branch.id,
        name: appointment.branch.name,
        address: appointment.branch.address,
        isActive: appointment.branch.isActive
      } : null
    }));

    return context.json({
      success: true,
      data: formattedAppointments,
      count: formattedAppointments.length,
      range: {
        startDate: start.toISOString(),
        endDate: end.toISOString()
      }
    }, 200);

  } catch (error) {
    console.error('Error en getAppointmentsByDateRangeController:', error);
    return context.json({
      success: false,
      error: 'Error interno del servidor'
    }, 500);
  }
}
