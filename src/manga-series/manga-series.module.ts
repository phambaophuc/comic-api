import { Module } from '@nestjs/common';

import { MangaSeriesController } from './manga-series.controller';
import { MangaSeriesService } from './manga-series.service';

@Module({
  controllers: [MangaSeriesController],
  providers: [MangaSeriesService],
  exports: [MangaSeriesService],
})
export class MangaSeriesModule {}
