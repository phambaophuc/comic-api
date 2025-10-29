import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';

import { PaginationParamDto } from '@/common/dto';

export class FindAllParamDto extends PaginationParamDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return [];
    if (typeof value === 'string') return [value];
    if (Array.isArray(value)) return value;
    return [];
  })
  @IsArray()
  @IsString({ each: true })
  genres?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsIn(['views', 'last_update'])
  sort?: 'views' | 'last_update' = 'last_update';

  @ApiPropertyOptional()
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';
}
