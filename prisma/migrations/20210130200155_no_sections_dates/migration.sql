/*
  Warnings:

  - You are about to drop the column `created_at` on the `assignment_sections` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `assignment_sections` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "assignment_sections" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "assignment_states" ALTER COLUMN "open" SET DEFAULT false;
