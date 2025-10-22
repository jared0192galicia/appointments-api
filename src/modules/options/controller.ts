import { prisma } from '@connections/';

export async function getAppointmentOptions(context: any) {
  const resources = await prisma.resource.findMany();
  const locations = await prisma.branch.findMany();
  console.log("🚀 ~ locations:", locations)
  const services = await prisma.service.findMany();

  const data = { resources, locations, services };
  return context.json(data, 200);
}
