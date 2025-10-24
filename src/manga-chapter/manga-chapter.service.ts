import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/prisma';

import { CreateMangaChapterDto } from './dto';
import { FindByChapterResponseDto } from './dto/response.dto';

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

  async findByChapterNumber(slug: string, cn: number): Promise<FindByChapterResponseDto> {
    const chapter = await this.prisma.mangaChapter.findFirst({
      where: {
        chapter_number: cn,
        series: { slug },
        is_deleted: false,
      },
      include: {
        series: true,
        images: {
          select: { image_order: true, local_path: true },
          orderBy: { image_order: 'asc' },
        },
      },
    });

    if (!chapter) {
      throw new NotFoundException(`Chapter ${cn} not found`);
    }

    const [prevChapter, nextChapter] = await Promise.all([
      this.prisma.mangaChapter.findFirst({
        where: {
          series: { slug },
          chapter_number: { lt: cn },
          is_deleted: false,
        },
        select: { chapter_number: true },
        orderBy: { chapter_number: 'desc' },
      }),
      this.prisma.mangaChapter.findFirst({
        where: {
          series: { slug },
          chapter_number: { gt: cn },
          is_deleted: false,
        },
        select: { chapter_number: true },
        orderBy: { chapter_number: 'asc' },
      }),
    ]);

    return {
      ...chapter,
      prev_chapter: prevChapter?.chapter_number ?? null,
      next_chapter: nextChapter?.chapter_number ?? null,
    };
  }
}
