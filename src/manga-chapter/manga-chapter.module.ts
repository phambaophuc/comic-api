import { Module } from '@nestjs/common';

import { MangaChapterController } from './manga-chapter.controller';
import { MangaChapterService } from './manga-chapter.service';

@Module({
  controllers: [MangaChapterController],
  providers: [MangaChapterService],
  exports: [MangaChapterService],
})
export class MangaChapterModule {}
