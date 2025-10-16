import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateMangaChapterDto } from './dto';
import { MangaChapterService } from './manga-chapter.service';

@ApiTags('Comic Chapters')
@Controller('chapter')
export class MangaChapterController {
  constructor(private readonly service: MangaChapterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new manga chapter' })
  @ApiResponse({ status: 201, description: 'Chapter created successfully' })
  create(@Body() createDto: CreateMangaChapterDto) {
    return this.service.create(createDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a manga chapter' })
  @ApiResponse({ status: 200, description: 'Chapter deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
