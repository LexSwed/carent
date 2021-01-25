/*
  Warnings:

  - Added the required column `name` to the `TopicAttachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TopicAttachment" ADD COLUMN     "name" TEXT NOT NULL;
