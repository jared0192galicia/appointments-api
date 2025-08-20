import { prisma } from "@connections/";
export async function uploadController(context: any) {
  const data = await prisma.resource.findMany();
  return context.json({ success: true, data  }, 200);
}
