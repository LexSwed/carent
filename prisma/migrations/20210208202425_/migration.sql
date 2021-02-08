/*
  Warnings:

  - You are about to drop the column `assignmentQuestionTaskId` on the `assignment_question_answer_options` table. All the data in the column will be lost.
  - You are about to drop the column `assignment_question_task_id` on the `assignment_questions_correct_answers` table. All the data in the column will be lost.
  - You are about to drop the `assignment_questions_tasks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assignment_question_id` to the `assignment_questions_correct_answers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assignment_questions_tasks" DROP CONSTRAINT "assignment_questions_tasks_question_id_fkey";

-- DropForeignKey
ALTER TABLE "assignment_question_answer_options" DROP CONSTRAINT "assignment_question_answer_option_assignmentQuestionTaskId_fkey";

-- DropForeignKey
ALTER TABLE "assignment_questions_correct_answers" DROP CONSTRAINT "assignment_questions_correct_a_assignment_question_task_id_fkey";

-- AlterTable
ALTER TABLE "assignment_question_answer_options" DROP COLUMN "assignmentQuestionTaskId",
ADD COLUMN     "assignmentQuestionId" TEXT;

-- AlterTable
ALTER TABLE "assignment_questions_correct_answers" DROP COLUMN "assignment_question_task_id",
ADD COLUMN     "assignment_question_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "assignment_questions_tasks";

-- AddForeignKey
ALTER TABLE "assignment_question_answer_options" ADD FOREIGN KEY ("assignmentQuestionId") REFERENCES "assignment_question_blocks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment_questions_correct_answers" ADD FOREIGN KEY ("assignment_question_id") REFERENCES "assignment_question_blocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
