import { prisma } from '../src/config/connections';
// Ajusta la ruta según dónde exportes tu cliente Prisma

async function main() {
  console.log('🌱 Ejecutando seed...');

  const sql = `
  BEGIN;

  -- 1) Roles
  INSERT INTO "Role" (id, name, created_at) VALUES
    (1, 'Administrador', '2025-10-01T10:00:00Z'),
    (2, 'Empleado', '2025-10-01T10:05:00Z'),
    (3, 'Cliente', '2025-10-01T10:10:00Z');

  -- 2) AppointmentStatus
  INSERT INTO "AppointmentStatus" (id, name, created_at) VALUES
    (1, 'AJENDADO', '2025-10-01T11:00:00Z'),
    (2, 'CONFIRMADO', '2025-10-01T11:05:00Z'),
    (3, 'CANCELADO', '2025-10-01T11:10:00Z'),
    (4, 'COMPLETADO', '2025-10-01T11:15:00Z');

  -- 3) Settings
  INSERT INTO "Settings" (
    id, businessName, workDays, workHours,
    reminderEmail, reminderWhats,
    created_at, updated_at
  ) VALUES (
    1,
    'Mi Negocio Demo',
    '{"monday": true, "tuesday": true, "wednesday": true, "thursday": true, "friday": true, "saturday": false, "sunday": false}' :: jsonb,
    '{"start": "09:00", "end": "18:00", "slotMinutes": 30}' :: jsonb,
    true,
    false,
    '2025-10-01T12:00:00Z',
    '2025-10-01T12:00:00Z'
  );

  -- 4) Branches
  INSERT INTO "Branch" (id, name, address, "mapUrl", created_at, "isActive") VALUES
    (1, 'Sucursal Centro', 'Av. Principal 123, Centro',
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3760.98686565101!2d-99.2394563905526!3d19.499200881718494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2032033292c61%3A0x3d3f8cdb64587c6c!2sTorres%20de%20Sat%C3%A9lite!5e0!3m2!1ses-419!2smx!4v1760220980712!5m2!1ses-419!2smx',
      '2025-10-01T12:30:00Z', true),
    (2, 'Sucursal Norte', 'Calle Norte 45',
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d900.0596138354852!2d-99.18101517688099!3d19.36390524851833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff8dad927eff%3A0x3f23c0bb9e193d3a!2sBol%20Insurgentes!5e0!3m2!1ses-419!2smx!4v1760222367267!5m2!1ses-419!2smx',
      '2025-10-01T12:35:00Z', true);

  -- 5) Services
  INSERT INTO "Service" (id, name, description, "durationMinutes", price, meta, created_at) VALUES
    (1, 'Corte de cabello', 'Corte hombre/basico', 30, 15.0,
      '{"category":"peluqueria"}' :: jsonb, '2025-10-01T13:00:00Z'),
    (2, 'Tinte', 'Coloración completa', 90, 45.0,
      '{"category":"peluqueria"}' :: jsonb, '2025-10-01T13:05:00Z'),
    (3, 'Manicure', 'Servicio de manicure', 45, 12.0,
      '{"category":"estetica"}' :: jsonb, '2025-10-01T13:10:00Z');

  -- 6) BranchService
  INSERT INTO "BranchService" (id, "branchId", "serviceId", "isActive", created_at) VALUES
    (1, 1, 1, true, '2025-10-01T13:30:00Z'),
    (2, 1, 2, true, '2025-10-01T13:31:00Z'),
    (3, 2, 1, true, '2025-10-01T13:32:00Z'),
    (4, 2, 3, true, '2025-10-01T13:33:00Z');

  -- 7) Resources
  INSERT INTO "Resource" (
    id, name, bio, "photoUrl", type, meta,
    "isActive", created_at, "branchId"
  ) VALUES
    (1, 'Juan Perez', 'Barbero con 5 años de experiencia',
      NULL, 'person', '{"specialties":["corte","barba"]}' :: jsonb,
      true, '2025-10-01T14:00:00Z', 1),
    (2, 'Sala 2 - Nail', 'Cabina para manicure',
      NULL, 'room', NULL, true, '2025-10-01T14:05:00Z', 2),
    (3, 'Ana Gomez', 'Colorista experto',
      NULL, 'person', '{"specialties":["tinte"]}' :: jsonb,
      true, '2025-10-01T14:10:00Z', 1);

  -- 8) ResourceService
  INSERT INTO "ResourceService" (id, "resourceId", "serviceId", "isActive", created_at) VALUES
    (1, 1, 1, true, '2025-10-01T14:30:00Z'),
    (2, 1, 2, false, '2025-10-01T14:31:00Z'),
    (3, 2, 3, true, '2025-10-01T14:32:00Z'),
    (4, 3, 2, true, '2025-10-01T14:33:00Z');

  -- 9) Users
  INSERT INTO "User" (
    id, email, phone, name, "surName",
    password, meta, created_at, active, "roleId"
  ) VALUES
    (3, 'cliente1@example.com', '5550000003', 'Luis', 'Lopez',
      'clientepass', NULL, '2025-10-01T15:10:00Z', true, 3),
    (4, 'cliente2@example.com', '5550000004', 'María', 'Santos',
      'clientepass2', NULL, '2025-10-01T15:15:00Z', true, 3);

  -- 10) Appointments (muchos registros aquí...)
  INSERT INTO "Appointment" (
    id, "userId", "branchId", "resourceId",
    "serviceId", "statusId", starts_at, ends_at,
    metadata, "clientNote", notes, created_at, updated_at
  ) VALUES
    (1, 3, 1, 1, 1, 1,
      '2025-10-10T09:00:00Z', '2025-10-10T09:30:00Z',
      '{"source":"web"}'::jsonb, 'Por favor puntual', NULL,
      '2025-10-02T08:00:00Z', '2025-10-02T08:00:00Z'),

    (2, 4, 2, 2, 3, 2,
      '2025-10-10T10:00:00Z', '2025-10-10T10:45:00Z',
      NULL, NULL, 'Cliente pidió esmalte rojo',
      '2025-10-02T09:00:00Z', '2025-10-02T09:00:00Z'),

    (3, 3, 1, 3, 2, 1,
      '2025-10-11T11:00:00Z', '2025-10-11T12:30:00Z',
      '{"notes":"prefiere horarios de tarde"}'::jsonb,
      'Acordar color', NULL,
      '2025-10-02T10:00:00Z', '2025-10-02T10:00:00Z'),

    (4, 3, 1, NULL, 1, 4,
      '2025-09-20T09:00:00Z', '2025-09-20T09:30:00Z',
      NULL, 'Asistencia pasada', 'Realizada con éxito',
      '2025-09-20T08:00:00Z', '2025-09-20T09:45:00Z'),

    (5, 3, 1, 1, 1, 2,
      '2025-12-05T10:00:00Z', '2025-12-05T10:30:00Z',
      '{"type":"consulta", "priority":"normal", "doctorType":"general"}'::jsonb,
      'Preferiría horario matutino',
      'Paciente con seguimiento de tratamiento anterior',
      '2025-12-01T09:00:00Z', '2025-12-01T09:00:00Z'),

    (6, 4, 1, 3, 2, 1,
      '2025-12-08T14:00:00Z', '2025-12-08T15:30:00Z',
      '{"type":"especialista", "department":"dermatologia", "followUp":true}'::jsonb,
      'Traer resultados de exámenes previos',
      'Consulta de seguimiento dermatológico',
      '2025-12-01T10:30:00Z', '2025-12-01T10:30:00Z'),

    (7, 3, 2, 2, 3, 1,
      '2025-12-12T09:30:00Z', '2025-12-12T10:15:00Z',
      '{"type":"checkup", "newPatient":false, "insurance":"particular"}'::jsonb,
      'Primera cita del día por favor',
      'Control médico de rutina',
      '2025-12-02T11:15:00Z', '2025-12-02T11:15:00Z'),

    (8, 4, 1, 1, 1, 3,
      '2025-12-15T11:00:00Z', '2025-12-15T11:30:00Z',
      '{"type":"consulta", "cancelReason":"emergencia familiar", "reschedule":true}'::jsonb,
      '', 'Paciente canceló por emergencia. Ofrecer reprogramar',
      '2025-12-03T14:20:00Z', '2025-12-04T09:45:00Z'),

    (9, 3, 1, 3, 2, 4,
      '2025-12-18T16:00:00Z', '2025-12-18T17:30:00Z',
      '{"type":"tratamiento", "procedure":"dermoabrasion", "result":"satisfactorio"}'::jsonb,
      'Última cita del tratamiento',
      'Tratamiento completado exitosamente. Paciente satisfecho.',
      '2025-12-10T08:30:00Z', '2025-12-18T17:45:00Z'),

    (10, 4, 2, 1, 1, 2,
      '2025-12-22T13:00:00Z', '2025-12-22T13:30:00Z',
      '{"type":"consulta", "seasonal":"navidad", "reminderSent":true}'::jsonb,
      'Cita pre-navideña',
      'Recordatorio enviado por WhatsApp',
      '2025-12-05T15:00:00Z', '2025-12-05T15:00:00Z');

  COMMIT;
  `;

  await prisma.$executeRawUnsafe(sql);
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
