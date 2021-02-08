/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[id,creator_id]` on the table `assignments`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "assignments.id_creator_id_unique" ON "assignments"("id", "creator_id");
