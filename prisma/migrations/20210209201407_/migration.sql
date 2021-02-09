/*
  Warnings:

  - The migration will remove the values [SingleChoice,MultipleChoice] on the enum `AssignmentQuestionType`. If these variants are still used in the database, the migration will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AssignmentQuestionType_new" AS ENUM ('Choice', 'Text', 'Number', 'Image', 'Document');
ALTER TABLE "public"."assignment_question_blocks" ALTER COLUMN "type" TYPE "AssignmentQuestionType_new" USING ("type"::text::"AssignmentQuestionType_new");
ALTER TYPE "AssignmentQuestionType" RENAME TO "AssignmentQuestionType_old";
ALTER TYPE "AssignmentQuestionType_new" RENAME TO "AssignmentQuestionType";
DROP TYPE "AssignmentQuestionType_old";
COMMIT;
