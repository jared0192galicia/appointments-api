/*
  Warnings:

  - You are about to drop the column `username` on the `AppUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."AppUser" DROP COLUMN "username",
ALTER COLUMN "roleId" SET DEFAULT 3;
