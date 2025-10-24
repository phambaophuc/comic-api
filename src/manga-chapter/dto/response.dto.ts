import { ApiProperty } from '@nestjs/swagger';

import { ChapterImageMinimalDto, MangaChapterDto, MangaSeriesDto } from '@/common/dto';

export class MangaChapterWithImagesAndSeriesDto extends MangaChapterDto {
  @ApiProperty({ type: [ChapterImageMinimalDto] })
  images: ChapterImageMinimalDto[];

  @ApiProperty({ type: [MangaSeriesDto] })
  series: MangaSeriesDto;
}

export class FindByChapterResponseDto extends MangaChapterWithImagesAndSeriesDto {
  @ApiProperty()
  prev_chapter: number | null;

  @ApiProperty()
  next_chapter: number | null;
}
