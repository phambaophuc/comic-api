import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/prisma';

import { CreateMangaChapterDto } from './dto';

@Injectable()
export class MangaChapterService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateMangaChapterDto) {
    return await this.prisma.mangaChapter.create({
      data: createDto,
      include: {
        series: true,
        images: { take: 10 },
      },
    });
  }

  async findOne(id: number) {
    const chapter = await this.prisma.mangaChapter.findUnique({
      where: { id },
      include: {
        series: true,
        images: {
          orderBy: { image_order: 'asc' },
        },
      },
    });

    if (!chapter || chapter.is_deleted) {
      throw new NotFoundException(`MangaChapter with ID ${id} not found`);
    }

    return chapter;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.mangaChapter.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
