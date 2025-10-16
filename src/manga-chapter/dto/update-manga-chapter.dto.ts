import { PartialType } from '@nestjs/swagger';

import { CreateMangaChapterDto } from './create-manga-chapter.dto';

export class UpdateMangaChapterDto extends PartialType(CreateMangaChapterDto) {}
