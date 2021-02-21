/*
  Warnings:

  - You are about to drop the column `hint` on the `assignment_question_answer_options` table. All the data in the column will be lost.
  - You are about to drop the column `textContent` on the `assignment_question_answer_options` table. All the data in the column will be lost.
  - You are about to drop the `assignment_questions_correct_answers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `text_content` to the `assignment_question_answer_options` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assignment_questions_correct_answers" DROP CONSTRAINT "assignment_questions_correct_answers_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "assignment_questions_correct_answers" DROP CONSTRAINT "assignment_questions_correct_answer_assignment_question_id_fkey";

-- AlterTable
ALTER TABLE "assignment_question_answer_options" DROP COLUMN "hint",
DROP COLUMN "textContent",
ADD COLUMN     "text_content" TEXT NOT NULL,
ADD COLUMN     "marked_correct" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "assignment_questions_correct_answers";
