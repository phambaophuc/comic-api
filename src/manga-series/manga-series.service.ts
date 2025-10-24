import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationParamDto } from '@/common/dto';
import { PrismaService } from '@/prisma';
import { generateSlug } from '@/shared/utils';

import {
  CreateMangaSeriesDto,
  CreateMangaSeriesResponseDto,
  FindAllMangaSeriesResponseDto,
  FindBySlugResponseDto,
  FindHotComicsResponseDto,
} from './dto';

@Injectable()
export class MangaSeriesService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateMangaSeriesDto): Promise<CreateMangaSeriesResponseDto> {
    return await this.prisma.mangaSeries.create({
      data: {
        ...createDto,
        slug: generateSlug(createDto.title),
      },
      include: {
        source: true,
      },
    });
  }

  async findAll(paginationDto: PaginationParamDto): Promise<FindAllMangaSeriesResponseDto> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [series, total] = await Promise.all([
      this.prisma.mangaSeries.findMany({
        include: {
          chapters: {
            orderBy: { chapter_number: 'desc' },
            take: 1,
          },
        },
      }),
      this.prisma.mangaSeries.count(),
    ]);

    const data = series
      .map((s) => ({
        ...s,
        updated_at: s.chapters[0]?.created_at ?? s.updated_at,
      }))
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(skip, skip + limit);

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

  async findHotComics(limit: number = 5): Promise<FindHotComicsResponseDto[]> {
    return this.prisma.mangaSeries.findMany({
      orderBy: {
        views: 'desc',
      },
      take: limit,
    });
  }

  async findBySlug(slug: string): Promise<FindBySlugResponseDto> {
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
}
