-- CreateEnum
CREATE TYPE "SourceStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "SeriesStatus" AS ENUM ('ACTIVE', 'PAUSED', 'COMPLETED', 'ERROR');

-- CreateEnum
CREATE TYPE "DownloadStatus" AS ENUM ('PENDING', 'DOWNLOADING', 'COMPLETED', 'FAILED', 'PARTIAL');

-- CreateTable
CREATE TABLE "manga_sources" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "base_url" TEXT NOT NULL,
    "parser_class" TEXT NOT NULL,
    "status" "SourceStatus" NOT NULL DEFAULT 'ACTIVE',
    "rate_limit_per_minute" INTEGER NOT NULL DEFAULT 30,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manga_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manga_series" (
    "id" SERIAL NOT NULL,
    "source_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT,
    "cover_url" TEXT,
    "target_url" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "genres" TEXT[],
    "status" "SeriesStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manga_series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manga_chapters" (
    "id" SERIAL NOT NULL,
    "series_id" INTEGER NOT NULL,
    "chapter_number" DOUBLE PRECISION NOT NULL,
    "chapter_title" TEXT,
    "chapter_url" TEXT NOT NULL,
    "image_count" INTEGER NOT NULL DEFAULT 0,
    "download_status" "DownloadStatus" NOT NULL DEFAULT 'PENDING',
    "downloaded_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "manga_chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapter_images" (
    "id" SERIAL NOT NULL,
    "chapter_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "image_order" INTEGER NOT NULL,
    "local_path" TEXT,
    "file_size" BIGINT,
    "download_status" "DownloadStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chapter_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "manga_sources_name_key" ON "manga_sources"("name");

-- CreateIndex
CREATE UNIQUE INDEX "manga_series_slug_key" ON "manga_series"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "manga_series_source_id_target_url_key" ON "manga_series"("source_id", "target_url");

-- CreateIndex
CREATE UNIQUE INDEX "manga_chapters_series_id_chapter_url_key" ON "manga_chapters"("series_id", "chapter_url");

-- CreateIndex
CREATE UNIQUE INDEX "chapter_images_chapter_id_image_order_key" ON "chapter_images"("chapter_id", "image_order");

-- AddForeignKey
ALTER TABLE "manga_series" ADD CONSTRAINT "manga_series_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "manga_sources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manga_chapters" ADD CONSTRAINT "manga_chapters_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "manga_series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter_images" ADD CONSTRAINT "chapter_images_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "manga_chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
