import { ApiProperty } from '@nestjs/swagger';

import { MangaChapterDto, MangaSeriesDto, PaginatedResponseDto } from '@/common/dto';

export class MangaSeriesWithChaptersDto extends MangaSeriesDto {
  @ApiProperty({ type: [MangaChapterDto] })
  chapters: MangaChapterDto[];
}

export class CreateMangaSeriesResponseDto extends MangaSeriesDto {}

export class FindAllMangaSeriesResponseDto extends PaginatedResponseDto<MangaSeriesWithChaptersDto> {
  @ApiProperty({ type: [MangaSeriesDto] })
  declare data: MangaSeriesWithChaptersDto[];
}

export class FindHotComicsResponseDto extends MangaSeriesDto {}

export class FindBySlugResponseDto extends MangaSeriesWithChaptersDto {}
