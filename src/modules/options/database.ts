// prisma-queries.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Obtener todos los servicios activamente listados (para primer dropdown)
 */
export async function getServices() {
  return prisma.service.findMany({
    where: {}, // agrega isActive si lo tuvieras en Service
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      description: true,
      durationMinutes: true,
      price: true,
      meta: true,
      createdAt: true,
    },
  });
}

/**
 * Obtener sucursales que ofrecen un servicio dado (serviceId).
 * Devuelve sucursal básica y meta mínima para mostrar en un dropdown.
 */
export async function getBranchesByService(serviceId: number) {
  return prisma.branch.findMany({
    where: {
      // la sucursal debe tener al menos un BranchService activo con ese serviceId
      branchServices: {
        some: {
          serviceId,
          isActive: true,
        },
      },
      isActive: true, // solo sucursales activas (opcional)
    },
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      address: true,
      mapUrl: true,
      // meta: true,
      createdAt: true,
      // incluir el BranchService si quieres detalles de la relación
      branchServices: {
        where: { serviceId },
        select: { id: true, isActive: true, createdAt: true },
      },
    },
  });
}

/**
 * Obtener recursos que ofrecen un servicio en una sucursal concreta.
 * Parámetros:
 * - serviceId: id del servicio seleccionado
 * - branchId: id de la sucursal seleccionada
 */
export async function getResourcesByServiceAndBranch(
  serviceId: number,
  branchId: number
) {
  return prisma.resource.findMany({
    where: {
      branchId,
      isActive: true,
      // recurso debe tener ResourceService activo para ese serviceId
      resourceServices: {
        some: {
          serviceId,
          isActive: true,
        },
      },
    },
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      bio: true,
      photoUrl: true,
      type: true,
      meta: true,
      isActive: true,
      createdAt: true,
      // incluir relación a resourceServices con el servicio filtrado (útil para mostrar precio/duración si está ahi)
      resourceServices: {
        where: { serviceId },
        select: { id: true, isActive: true, createdAt: true, serviceId: true },
      },
    },
  });
}

/**
 * Consulta combinada: para un serviceId devuelve sucursales que lo ofrecen
 * y para cada sucursal sus recursos que ofrecen ese servicio.
 * Útil para poblar en una sola llamada: branches -> resources (filtro frontend).
 */
export async function getBranchesWithResourcesForService(serviceId: number) {
  return prisma.branch.findMany({
    where: {
      isActive: true,
      branchServices: { some: { serviceId, isActive: true } },
    },
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      address: true,
      mapUrl: true,
      // meta: true,
      // recursos de la sucursal que ofrecen el servicio
      resources: {
        where: {
          resourceServices: { some: { serviceId, isActive: true } },
          isActive: true,
        },
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
          type: true,
          photoUrl: true,
          meta: true,
          // incluir resourceServices para detalle de la relación
          resourceServices: {
            where: { serviceId },
            select: { id: true, serviceId: true, isActive: true },
          },
        },
      },
      branchServices: {
        where: { serviceId },
        select: { id: true, isActive: true },
      },
    },
  });
}

/**
 * Ejemplos de uso (puedes llamarlos desde tus rutas Bun/Hono)
 */
// (1) GET /api/services
export async function handleListServices(req: any, res: any) {
  const services = await getServices();
  return res.json(services);
}

// (2) GET /api/branches?serviceId=1
export async function handleBranchesByService(req: any, res: any) {
  const serviceId = Number(req.query.serviceId);
  if (!serviceId)
    return res.status(400).json({ error: 'serviceId is required' });
  const branches = await getBranchesByService(serviceId);
  return res.json(branches);
}

// (3) GET /api/resources?serviceId=1&branchId=2
export async function handleResourcesByServiceAndBranch(req: any, res: any) {
  const serviceId = Number(req.query.serviceId);
  const branchId = Number(req.query.branchId);
  if (!serviceId || !branchId)
    return res
      .status(400)
      .json({ error: 'serviceId and branchId are required' });
  const resources = await getResourcesByServiceAndBranch(serviceId, branchId);
  return res.json(resources);
}

// (4) GET /api/branches-with-resources?serviceId=1
export async function handleBranchesWithResources(req: any, res: any) {
  const serviceId = Number(req.query.serviceId);
  if (!serviceId)
    return res.status(400).json({ error: 'serviceId is required' });
  const data = await getBranchesWithResourcesForService(serviceId);
  return res.json(data);
}
