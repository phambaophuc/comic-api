import { Body, Controller, Get, Param, ParseFloatPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateMangaChapterDto } from './dto';
import { MangaChapterService } from './manga-chapter.service';

@ApiTags('Comic Chapters')
@Controller('chapters')
export class MangaChapterController {
  constructor(private readonly service: MangaChapterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new manga chapter' })
  @ApiResponse({ status: 201, description: 'Chapter created successfully' })
  create(@Body() createDto: CreateMangaChapterDto) {
    return this.service.create(createDto);
  }

  @Get(':series_slug/:chapter_number')
  @ApiOperation({ summary: 'Get a manga chapter by series slug and chapter number' })
  @ApiResponse({ status: 200, description: 'Return the chapter' })
  @ApiResponse({ status: 404, description: 'Chapter not found' })
  findByChapterNumber(
    @Param('series_slug') slug: string,
    @Param('chapter_number', ParseFloatPipe) chapterNumber: number,
  ) {
    return this.service.findByChapterNumber(slug, chapterNumber);
  }
}
