import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationDto } from '@/common/dto';
import { PrismaService } from '@/prisma';
import { generateSlug } from '@/shared/utils';

import { CreateMangaSeriesDto, UpdateMangaSeriesDto } from './dto';

@Injectable()
export class MangaSeriesService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateMangaSeriesDto) {
    return await this.prisma.mangaSeries.create({
      data: {
        ...createDto,
        slug: generateSlug(createDto.title),
      },
      include: {
        source: true,
        chapters: { take: 10, orderBy: { created_at: 'desc' } },
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.mangaSeries.findMany({
        skip,
        take: limit,
        orderBy: { updated_at: 'desc' },
      }),
      this.prisma.mangaSeries.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const series = await this.prisma.mangaSeries.findUnique({
      where: { id },
      include: {
        source: true,
        chapters: {
          where: { is_deleted: false },
          orderBy: { created_at: 'desc' },
        },
      },
    });

    if (!series) {
      throw new NotFoundException(`MangaSeries with ID ${id} not found`);
    }

    return series;
  }

  async findBySlug(slug: string) {
    const series = await this.prisma.mangaSeries.findUnique({
      where: { slug },
      include: {
        chapters: {
          where: { is_deleted: false },
          orderBy: { chapter_number: 'desc' },
        },
      },
    });

    if (!series) {
      throw new NotFoundException(`MangaSeries not found`);
    }

    return series;
  }

  async findBySlugAndChapter(slug: string, cn: string) {
    const chapter = await this.prisma.mangaSeries.findUnique({
      where: {
        slug,
      },
      select: {
        _count: {
          select: {
            chapters: {
              where: {
                is_deleted: false,
              },
            },
          },
        },
        chapters: {
          where: { chapter_number: cn },
          include: {
            images: {
              select: {
                image_order: true,
                local_path: true,
              },
              orderBy: {
                image_order: 'asc',
              },
            },
          },
        },
      },
    });
    if (!chapter) throw new NotFoundException('Chapter not found');
    return { ...chapter.chapters[0], total_chapters: chapter._count.chapters };
  }

  async update(id: number, updateDto: UpdateMangaSeriesDto) {
    await this.findOne(id);
    return this.prisma.mangaSeries.update({
      where: { id },
      data: updateDto,
      include: {
        source: true,
        chapters: { take: 10 },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.mangaSeries.delete({
      where: { id },
    });
  }
}
