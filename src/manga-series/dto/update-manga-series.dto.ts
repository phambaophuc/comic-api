import { PartialType } from '@nestjs/swagger';

import { CreateMangaSeriesDto } from './create-manga-series.dto';

export class UpdateMangaSeriesDto extends PartialType(CreateMangaSeriesDto) {}
