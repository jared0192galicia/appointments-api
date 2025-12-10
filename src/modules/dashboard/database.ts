import { prisma } from "@connections/";

export async function getAppointmentsByDateRange(startDate: Date, endDate: Date) {
  return await prisma.appointment.findMany({
    where: {
      startsAt: {
        gte: startDate,
        lte: endDate
      }
    },
    include: {
      user: true,
      resource: {
        select: {
          id: true,
          name: true,
          type: true,
          bio: true,
          photoUrl: true,
          isActive: true
        }
      },
      service: {
        select: {
          id: true,
          name: true,
          durationMinutes: true,
          price: true,
          description: true
        }
      },
      status: {
        select: {
          id: true,
          name: true
        }
      },
      branch: {
        select: {
          id: true,
          name: true,
          address: true,
          isActive: true
        }
      }
    },
    orderBy: {
      startsAt: 'asc'
    }
  });
}
