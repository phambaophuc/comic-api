import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaginationParamDto } from '@/common/dto';

import { CreateMangaSeriesDto } from './dto';
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
  findAll(@Query() paginationDto: PaginationParamDto) {
    return this.service.findAll(paginationDto);
  }

  @Get('hot')
  @ApiOperation({ summary: 'Get manga series hot' })
  @ApiResponse({ status: 200, description: 'Return series hot' })
  getHotComics(@Query('limit', ParseIntPipe) limit: number) {
    return this.service.findHotComics(limit);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a manga series by Slug' })
  @ApiResponse({ status: 200, description: 'Return the series' })
  @ApiResponse({ status: 404, description: 'Series not found' })
  findOne(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }
}
