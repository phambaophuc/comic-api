import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { MangaChapterModule } from './manga-chapter';
import { MangaSeriesModule } from './manga-series';
import { MangaSourceModule } from './manga-source';
import { PrismaModule } from './prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    PrismaModule,
    MangaSourceModule,
    MangaSeriesModule,
    MangaChapterModule,
  ],
})
export class AppModule {}
