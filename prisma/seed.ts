import { prisma } from "@connections/*";

async function main() {
  console.log('🌱 Ejecutando seed...');

  await prisma.$transaction([
    prisma.$executeRawUnsafe(`
      INSERT INTO "Role" (id, name, created_at) VALUES
        (1, 'Administrador', '2025-10-01T10:00:00Z'),
        (2, 'Empleado',      '2025-10-01T10:05:00Z'),
        (3, 'Cliente',       '2025-10-01T10:10:00Z')
      ON CONFLICT (id) DO NOTHING;
    `),

    prisma.$executeRawUnsafe(`
      INSERT INTO "AppointmentStatus" (id, name, created_at) VALUES
        (1, 'AJENDADO',   '2025-10-01T11:00:00Z'),
        (2, 'CONFIRMADO', '2025-10-01T11:05:00Z'),
        (3, 'CANCELADO',  '2025-10-01T11:10:00Z'),
        (4, 'COMPLETADO', '2025-10-01T11:15:00Z')
      ON CONFLICT (id) DO NOTHING;
    `),

    prisma.$executeRawUnsafe(`
      INSERT INTO "Settings" (
        id, businessName, workDays, workHours,
        reminderEmail, reminderWhats,
        created_at, updated_at
      ) VALUES (
        1,
        'Mi Negocio Demo',
        '{"monday": true, "tuesday": true, "wednesday": true, "thursday": true, "friday": true, "saturday": false, "sunday": false}'::jsonb,
        '{"start": "09:00", "end": "18:00", "slotMinutes": 30}'::jsonb,
        true,
        false,
        '2025-10-01T12:00:00Z',
        '2025-10-01T12:00:00Z'
      )
      ON CONFLICT (id) DO NOTHING;
    `),

    prisma.$executeRawUnsafe(`
      INSERT INTO "Branch" (id, name, address, "mapUrl", created_at, "isActive") VALUES
        (1, 'Sucursal Centro', 'Av. Principal 123, Centro',
          'https://www.google.com/maps/embed?123', '2025-10-01T12:30:00Z', true),
        (2, 'Sucursal Norte', 'Calle Norte 45',
          'https://www.google.com/maps/embed?456', '2025-10-01T12:35:00Z', true)
      ON CONFLICT (id) DO NOTHING;
    `),

    prisma.$executeRawUnsafe(`
      INSERT INTO "Service" (id, name, description, "durationMinutes", price, meta, created_at) VALUES
        (1, 'Corte de cabello', 'Corte hombre/basico', 30, 15.0, '{"category":"peluqueria"}'::jsonb, '2025-10-01T13:00:00Z'),
        (2, 'Tinte', 'Coloración completa', 90, 45.0, '{"category":"peluqueria"}'::jsonb, '2025-10-01T13:05:00Z'),
        (3, 'Manicure', 'Servicio de manicure', 45, 12.0, '{"category":"estetica"}'::jsonb, '2025-10-01T13:10:00Z')
      ON CONFLICT (id) DO NOTHING;
    `),

    prisma.$executeRawUnsafe(`
      INSERT INTO "BranchService" (id, "branchId", "serviceId", "isActive", created_at") VALUES
        (1, 1, 1, true, '2025-10-01T13:30:00Z'),
        (2, 1, 2, true, '2025-10-01T13:31:00Z'),
        (3, 2, 1, true, '2025-10-01T13:32:00Z'),
        (4, 2, 3, true, '2025-10-01T13:33:00Z')
      ON CONFLICT (id) DO NOTHING;
    `),

    prisma.$executeRawUnsafe(`
      INSERT INTO "Resource" (
        id, name, bio, "photoUrl", type, meta, "isActive", created_at, "branchId"
      ) VALUES
        (1, 'Juan Perez', 'Barbero con 5 años de experiencia', NULL, 'person', '{"specialties":["corte","barba"]}'::jsonb, true, '2025-10-01T14:00:00Z', 1),
        (2, 'Sala 2 - Nail', 'Cabina para manicure', NULL, 'room', NULL, true, '2025-10-01T14:05:00Z', 2),
        (3, 'Ana Gomez', 'Colorista experto', NULL, 'person', '{"specialties":["tinte"]}'::jsonb, true, '2025-10-01T14:10:00Z', 1)
      ON CONFLICT (id) DO NOTHING;
    `),

    prisma.$executeRawUnsafe(`
      INSERT INTO "ResourceService" (id, "resourceId", "serviceId", "isActive", created_at) VALUES
        (1, 1, 1, true, '2025-10-01T14:30:00Z'),
        (2, 1, 2, false, '2025-10-01T14:31:00Z'),
        (3, 2, 3, true, '2025-10-01T14:32:00Z'),
        (4, 3, 2, true, '2025-10-01T14:33:00Z')
      ON CONFLICT (id) DO NOTHING;
    `),

    prisma.$executeRawUnsafe(`
      INSERT INTO "User" (
        id, email, phone, name, "surName", password,
        meta, created_at, active, "roleId"
      ) VALUES
        (3, 'cliente1@example.com', '5550000003', 'Luis', 'Lopez', 'clientepass', NULL, '2025-10-01T15:10:00Z', true, 3),
        (4, 'cliente2@example.com', '5550000004', 'María', 'Santos', 'clientepass2', NULL, '2025-10-01T15:15:00Z', true, 3)
      ON CONFLICT (id) DO NOTHING;
    `),

    prisma.$executeRawUnsafe(`
      INSERT INTO "Appointment" (
        id, "userId", "branchId", "resourceId", "serviceId", "statusId",
        starts_at, ends_at, metadata, "clientNote", notes,
        created_at, updated_at
      ) VALUES
        (1, 3, 1, 1, 1, 1,
          '2025-10-10T09:00:00Z', '2025-10-10T09:30:00Z',
          '{"source":"web"}'::jsonb, 'Por favor puntual', NULL,
          '2025-10-02T08:00:00Z', '2025-10-02T08:00:00Z')
      ON CONFLICT (id) DO NOTHING;
    `),
  ]);

  console.log('🌱 Seed ejecutado con éxito.');
}

main()
  .catch((err) => {
    console.error('❌ Error en seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
