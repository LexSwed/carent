/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[id,name]` on the table `Layout`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Layout.id_name_unique" ON "Layout"("id", "name");
