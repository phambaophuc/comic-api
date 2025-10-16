import { Module } from '@nestjs/common';

import { MangaSourceController } from './manga-source.controller';
import { MangaSourceService } from './manga-source.service';

@Module({
  controllers: [MangaSourceController],
  providers: [MangaSourceService],
  exports: [MangaSourceService],
})
export class MangaSourceModule {}
