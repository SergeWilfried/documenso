/*
  Warnings:

  - You are about to drop the column `twoFactorBackupCodes` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twoFactorEnabled` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "twoFactorBackupCodes",
DROP COLUMN "twoFactorEnabled";
