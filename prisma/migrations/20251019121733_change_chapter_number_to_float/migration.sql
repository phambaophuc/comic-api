/*
  Warnings:

  - You are about to drop the column `chapter_number_num` on the `manga_chapters` table. All the data in the column will be lost.
  - Changed the type of `chapter_number` on the `manga_chapters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "manga_chapters" RENAME COLUMN "chapter_number" TO "chapter_number_old";

ALTER TABLE "manga_chapters" ADD COLUMN "chapter_number" DOUBLE PRECISION;

UPDATE "manga_chapters"
SET "chapter_number" = NULLIF("chapter_number_old", '')::float
WHERE "chapter_number_old" ~ '^[0-9]+(\.[0-9]+)?$';

ALTER TABLE "manga_chapters" DROP COLUMN "chapter_number_old";

ALTER TABLE "manga_chapters" ALTER COLUMN "chapter_number" SET NOT NULL;
