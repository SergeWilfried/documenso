-- AlterEnum
ALTER TYPE "FieldType" ADD VALUE 'PHONE_NUMBER';

-- AlterTable
ALTER TABLE "Recipient" ADD COLUMN     "phoneNumber" VARCHAR(15);
