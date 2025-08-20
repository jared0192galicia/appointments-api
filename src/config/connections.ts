import { PrismaClient } from "@prisma/client";

/**
 * Conexion para la base de datos de postgres
 */
export const prisma = new PrismaClient();
