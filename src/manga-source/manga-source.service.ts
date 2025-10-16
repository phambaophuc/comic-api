import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/prisma';

import { CreateMangaSourceDto, UpdateMangaSourceDto } from './dto';

@Injectable()
export class MangaSourceService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateMangaSourceDto) {
    return await this.prisma.mangaSource.create({
      data: createDto,
    });
  }

  async findOne(id: number) {
    const source = await this.prisma.mangaSource.findUnique({
      where: { id },
      include: {
        series: {
          take: 10,
          orderBy: { created_at: 'desc' },
        },
      },
    });

    if (!source) {
      throw new NotFoundException(`MangaSource with ID ${id} not found`);
    }

    return source;
  }

  async update(id: number, updateDto: UpdateMangaSourceDto) {
    await this.findOne(id);
    return this.prisma.mangaSource.update({
      where: { id },
      data: updateDto,
      include: { series: { take: 5 } },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.mangaSource.delete({
      where: { id },
    });
  }
}
