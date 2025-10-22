import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { DownloadStatus, SeriesStatus, SourceStatus } from '@prisma/client';

// ========== Base Entity DTOs ==========
class BaseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

export class MangaSourceDto extends BaseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  base_url: string;

  @ApiProperty()
  parser_class: string;

  @ApiProperty({ enum: SourceStatus })
  status: SourceStatus;

  @ApiProperty()
  rate_limit_per_minute: number;
}

export class ChapterImageDto extends BaseDto {
  @ApiProperty()
  chapter_id: number;

  @ApiProperty()
  image_url: string;

  @ApiProperty()
  image_order: number;

  @ApiProperty({ nullable: true })
  local_path: string | null;

  @ApiProperty({ nullable: true, type: 'string' })
  file_size: bigint | null;

  @ApiProperty({ enum: DownloadStatus })
  download_status: DownloadStatus;
}

export class ChapterImageMinimalDto extends PickType(ChapterImageDto, [
  'image_order',
  'local_path',
] as const) {}

export class MangaChapterDto extends OmitType(BaseDto, ['updated_at'] as const) {
  @ApiProperty()
  series_id: number;

  @ApiProperty()
  chapter_number: number;

  @ApiProperty({ nullable: true })
  chapter_title: string | null;

  @ApiProperty()
  chapter_url: string;

  @ApiProperty()
  image_count: number;

  @ApiProperty({ enum: DownloadStatus })
  download_status: DownloadStatus;

  @ApiProperty({ nullable: true })
  downloaded_at: Date | null;
}

export class MangaSeriesDto extends BaseDto {
  @ApiProperty()
  source_id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ nullable: true })
  description: string | null;

  @ApiProperty({ nullable: true })
  author: string | null;

  @ApiProperty({ nullable: true })
  cover_url: string | null;

  @ApiProperty()
  target_url: string;

  @ApiProperty()
  views: number;

  @ApiProperty({ type: [String] })
  genres: string[];

  @ApiProperty({ enum: SeriesStatus })
  status: SeriesStatus;
}
