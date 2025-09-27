import { prisma } from '@connections/*';

export default async function CreateFirtsRows() {
  console.log('🚀 Inicializando base de datos...');
  await prisma.role.create({ data: { name: 'Administrador' } });
  await prisma.role.create({ data: { name: 'Usuario' } });
  await prisma.role.create({ data: { name: 'Cliente' } });

  // Crear roles base si no existen
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
    },
  });

  // await prisma.role.upsert({
  //   where: { name: 'EMPLOYEE' },
  //   update: {},
  //   create: { name: 'EMPLOYEE' },
  // });

  // await prisma.role.upsert({
  //   where: { name: 'CLIENT' },
  //   update: {},
  //   create: { name: 'CLIENT' },
  // });

  // Crear usuario root admin
  const existingRoot = await prisma.user.findFirst({
    where: { email: 'root@system.com' },
  });

  if (!existingRoot) {
    await prisma.user.create({
      data: {
        name: 'Root',
        surName: 'Admin',
        email: 'root@system.com',
        password: 'admin1234', // Hashea esto si es producción
        phone: '0000000000',
        roleId: adminRole.id,
      },
    });
    console.log('✅ Usuario root creado: root@system.com / admin1234');
  } else {
    console.log('🔐 Usuario root ya existe');
  }

  // Estados de citas
  const statuses = ['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];
  for (const status of statuses) {
    await prisma.appointmentStatus.upsert({
      where: { name: status },
      update: {},
      create: { name: status },
    });
  }

  console.log('✅ Base de datos inicializada correctamente');
}
