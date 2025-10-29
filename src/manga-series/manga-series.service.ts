import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/prisma';
import { generateSlug } from '@/shared/utils';

import {
  CreateMangaSeriesDto,
  CreateMangaSeriesResponseDto,
  FindAllMangaSeriesResponseDto,
  FindAllParamDto,
  FindBySlugResponseDto,
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

  async findAll(paramDto: FindAllParamDto): Promise<FindAllMangaSeriesResponseDto> {
    const { page = 1, limit = 10, genres = [], sort = 'last_update', order = 'desc' } = paramDto;
    const skip = (page - 1) * limit;

    const whereCondition: any = {
      last_update: { not: null },
    };

    if (genres.length > 0) {
      whereCondition.genres = { hasEvery: genres };
    }

    const [data, total] = await Promise.all([
      this.prisma.mangaSeries.findMany({
        skip,
        take: limit,
        where: whereCondition,
        orderBy: { [sort]: order },
        include: {
          chapters: {
            orderBy: { chapter_number: 'desc' },
            take: 1,
          },
        },
      }),
      this.prisma.mangaSeries.count({
        where: whereCondition,
      }),
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
