/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[id,teacher_id]` on the table `Class`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[id,user_id]` on the table `Teacher`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Class.id_teacher_id_unique" ON "Class"("id", "teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher.id_user_id_unique" ON "Teacher"("id", "user_id");
