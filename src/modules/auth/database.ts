import { prisma } from '@connections/connections';
// import { cuenta } from '@database/cuenta';
// import { eq } from 'drizzle-orm';

export async function queryGetAccoutByEmail(email: string) {
  return await prisma.appUser.findUnique({ where: { email: email } });
}

export async function queryInsertAccout(user: any) {
  // const [data] = await db.insert(cuenta).values(user).returning({ id: cuenta.id });
  return await prisma.appUser.create({data: user});
}

// export async function queryUpdateAccountField(user: string, field: keyof typeof cuenta, value: any) {
//   const [data] = await db
//     .update(cuenta)
//     .set({ [field]: value })
//     .where(eq(cuenta.usuario, user))
//     .returning({ id: cuenta.id });
//   return data;
// }
