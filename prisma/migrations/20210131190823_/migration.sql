/*
  Warnings:

  - Added the required column `name` to the `assignment_variants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assignment_variants" ADD COLUMN     "name" TEXT NOT NULL;
