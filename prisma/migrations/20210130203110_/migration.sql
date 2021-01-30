/*
  Warnings:

  - Made the column `assignment_id` on table `assignment_sections` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "assignment_sections" ALTER COLUMN "assignment_id" SET NOT NULL;
