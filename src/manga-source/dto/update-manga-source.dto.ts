import { PartialType } from '@nestjs/swagger';

import { CreateMangaSourceDto } from './create-manga-source.dto';

export class UpdateMangaSourceDto extends PartialType(CreateMangaSourceDto) {}
