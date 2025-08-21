import { prisma } from '@connections/*';

export default async function CreateFirtsRows() {
  await prisma.role.create({ data: { name: 'Administrador' } });
  await prisma.role.create({ data: { name: 'Usuario' } });
  await prisma.role.create({ data: { name: 'Cliente' } });
}
