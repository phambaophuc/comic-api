import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DownloadStatus } from '@prisma/client';
import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMangaChapterDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  series_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  chapter_number: number;

  @ApiPropertyOptional({ example: 'The Beginning' })
  @IsOptional()
  @IsString()
  chapter_title?: string;

  @ApiProperty({ example: 'https://example.com/chapter-1' })
  @IsString()
  chapter_url: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  image_count?: number;

  @ApiPropertyOptional({ enum: DownloadStatus, default: DownloadStatus.PENDING })
  @IsOptional()
  @IsEnum(DownloadStatus)
  download_status?: DownloadStatus;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  is_deleted?: boolean;
}
