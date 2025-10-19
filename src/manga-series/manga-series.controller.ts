import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaginationDto } from '@/common/dto';

import { CreateMangaSeriesDto, UpdateMangaSeriesDto } from './dto';
import { MangaSeriesService } from './manga-series.service';

@ApiTags('Comics')
@Controller('comics')
export class MangaSeriesController {
  constructor(private readonly service: MangaSeriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new manga series' })
  @ApiResponse({ status: 201, description: 'Series created successfully' })
  create(@Body() createDto: CreateMangaSeriesDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all manga series' })
  @ApiResponse({ status: 200, description: 'Return all series' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.service.findAll(paginationDto);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a manga series by Slug' })
  @ApiResponse({ status: 200, description: 'Return the series' })
  @ApiResponse({ status: 404, description: 'Series not found' })
  findOne(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Get(':slug/chapters/:chapter_number')
  @ApiOperation({ summary: 'Get a manga chapter by series slug and chapter number' })
  @ApiResponse({ status: 200, description: 'Return the chapter' })
  @ApiResponse({ status: 404, description: 'Chapter not found' })
  findBySlugAndChapter(
    @Param('slug') slug: string,
    @Param('chapter_number', ParseFloatPipe) chapterNumber: number,
  ) {
    return this.service.findBySlugAndChapter(slug, chapterNumber);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a manga series' })
  @ApiResponse({ status: 200, description: 'Series updated successfully' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateMangaSeriesDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a manga series' })
  @ApiResponse({ status: 200, description: 'Series deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
