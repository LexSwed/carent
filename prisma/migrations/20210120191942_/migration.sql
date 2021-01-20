/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `Layout`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX "Layout.id_name_unique";

-- CreateIndex
CREATE UNIQUE INDEX "Layout.name_unique" ON "Layout"("name");
