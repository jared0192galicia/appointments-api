import { prisma } from '@connections/*';
import type { Context } from 'hono';

export async function postCiteController(context: Context) {
  try {
    const { service, location, resource, hour, comments, date } =
      await context.req.json();

    const startsAt = new Date(hour);

    const endsAt = new Date(
      startsAt.getTime() + service.durationMinutes * 60 * 1000
    );
    
    await prisma.appointment.create({
      data: {
        userId: 1,
        branchId: location.id,
        resourceId: resource?.id ?? null,
        serviceId: service.id,
        statusId: 1, // SCHEDULED
        startsAt,
        endsAt,
        clientNote: comments ?? null,
        metadata: {
          selectedDate: date,
          serviceName: service.name,
          resourceName: resource?.name,
          branchName: location.name,
        },
      },
      include: {
        service: true,
        branch: true,
        resource: true,
        status: true,
      },
    });

    return context.json(200);
  } catch (error) {
    console.error('error:', error);
    return context.json({ success: false, error: 'Error interno' }, 500);
  }
}
