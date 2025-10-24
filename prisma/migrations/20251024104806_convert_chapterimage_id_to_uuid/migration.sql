/*
  Warnings:

  - The primary key for the `chapter_images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `chapter_images` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `download_status` column on the `chapter_images` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "public"."chapter_images" DROP CONSTRAINT "chapter_images_new_chapter_id_fkey";

-- AlterTable
ALTER TABLE "chapter_images" DROP CONSTRAINT "chapter_images_new_pkey",
RENAME CONSTRAINT "chapter_images_new_pkey" TO "chapter_images_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "download_status",
ADD COLUMN     "download_status" "DownloadStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "chapter_images_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "chapter_images" ADD CONSTRAINT "chapter_images_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "manga_chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
