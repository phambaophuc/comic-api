import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

import { SourceStatus } from '@/common/enums';

export class CreateMangaSourceDto {
  @ApiProperty({ example: 'MangaDex' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://mangadex.org' })
  @IsString()
  base_url: string;

  @ApiProperty({ example: 'MangaDexParser' })
  @IsString()
  parser_class: string;

  @ApiPropertyOptional({ enum: SourceStatus, default: SourceStatus.ACTIVE })
  @IsOptional()
  @IsEnum(SourceStatus)
  status?: SourceStatus;

  @ApiPropertyOptional({ example: 30, default: 30 })
  @IsOptional()
  @IsInt()
  @Min(1)
  rate_limit_per_minute?: number;
}
