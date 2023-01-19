/*
  Warnings:

  - You are about to drop the column `commentsCount` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "commentsCount",
ALTER COLUMN "isPublished" DROP DEFAULT,
ALTER COLUMN "isRepost" DROP DEFAULT;
