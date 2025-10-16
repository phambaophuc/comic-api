import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateMangaSourceDto, UpdateMangaSourceDto } from './dto';
import { MangaSourceService } from './manga-source.service';

@ApiTags('Sources')
@Controller('sources')
export class MangaSourceController {
  constructor(private readonly service: MangaSourceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new manga source' })
  @ApiResponse({ status: 201, description: 'Source created successfully' })
  create(@Body() createDto: CreateMangaSourceDto) {
    return this.service.create(createDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a manga source by ID' })
  @ApiResponse({ status: 200, description: 'Return the source' })
  @ApiResponse({ status: 404, description: 'Source not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a manga source' })
  @ApiResponse({ status: 200, description: 'Source updated successfully' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateMangaSourceDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a manga source' })
  @ApiResponse({ status: 200, description: 'Source deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
