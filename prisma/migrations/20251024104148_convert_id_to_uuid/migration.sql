-- Enable UUID extension if not available
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1️⃣ Thêm cột UUID tạm
ALTER TABLE "chapter_images"
ADD COLUMN "uuid" UUID DEFAULT gen_random_uuid();

-- 2️⃣ Sinh UUID cho các bản ghi cũ
UPDATE "chapter_images"
SET "uuid" = gen_random_uuid()
WHERE "uuid" IS NULL;

-- 3️⃣ Tạo bảng mới có id kiểu UUID
CREATE TABLE "chapter_images_new" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "chapter_id" INTEGER NOT NULL,
  "image_url" TEXT NOT NULL,
  "image_order" INTEGER NOT NULL,
  "local_path" TEXT,
  "file_size" BIGINT,
  "download_status" TEXT NOT NULL DEFAULT 'PENDING',
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "chapter_images_new_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "manga_chapters"("id") ON DELETE CASCADE,
  CONSTRAINT "chapter_images_new_unique_order" UNIQUE ("chapter_id", "image_order")
);

-- 4️⃣ Copy dữ liệu sang bảng mới
INSERT INTO "chapter_images_new" (
  "id",
  "chapter_id",
  "image_url",
  "image_order",
  "local_path",
  "file_size",
  "download_status",
  "created_at"
)
SELECT
  "uuid",
  "chapter_id",
  "image_url",
  "image_order",
  "local_path",
  "file_size",
  "download_status",
  "created_at"
FROM "chapter_images";

-- 5️⃣ Xóa bảng cũ và đổi tên bảng mới
DROP TABLE "chapter_images";
ALTER TABLE "chapter_images_new" RENAME TO "chapter_images";

-- 6️⃣ (Tùy chọn) Kiểm tra ràng buộc duy nhất
ALTER TABLE "chapter_images" ADD CONSTRAINT "chapter_images_unique_order" UNIQUE ("chapter_id", "image_order");
