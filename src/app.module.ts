import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MangaChapterModule } from './manga-chapter';
import { MangaSeriesModule } from './manga-series';
import { MangaSourceModule } from './manga-source';
import { PrismaModule } from './prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    MangaSourceModule,
    MangaSeriesModule,
    MangaChapterModule,
  ],
})
export class AppModule {}
