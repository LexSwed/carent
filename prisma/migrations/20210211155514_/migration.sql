/*
  Warnings:

  - You are about to drop the column `label` on the `assignment_question_answer_options` table. All the data in the column will be lost.
  - You are about to drop the column `orderKey` on the `assignment_question_answer_options` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `assignment_question_answer_options` table. All the data in the column will be lost.
  - Added the required column `textContent` to the `assignment_question_answer_options` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `assignment_question_answer_options` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `assignmentQuestionId` on table `assignment_question_answer_options` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "assignment_question_answer_options" DROP COLUMN "label",
DROP COLUMN "orderKey",
DROP COLUMN "imageUrl",
ADD COLUMN     "textContent" TEXT NOT NULL,
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "assignmentQuestionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "assignment_question_blocks" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "assignment_sections" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
