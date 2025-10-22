import { Injectable } from '@nestjs/common';

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
    const [chapter, total] = await Promise.all([
      this.prisma.mangaChapter.findFirstOrThrow({
        where: { chapter_number: cn, series: { slug } },
        include: {
          series: true,
          images: {
            select: {
              image_order: true,
              local_path: true,
            },
            orderBy: { image_order: 'asc' },
          },
        },
      }),
      this.prisma.mangaChapter.count({
        where: { series: { slug }, is_deleted: false },
      }),
    ]);

    return { ...chapter, total_chapters: total };
  }
}
