import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMangaSeriesDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  source_id: number;

  @ApiProperty({ example: 'One Piece' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'A great adventure manga' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Eiichiro Oda' })
  @IsString()
  author: string;

  @ApiProperty({ example: 'https://example.com/cover.jpg' })
  @IsString()
  cover_url: string;

  @ApiProperty({ example: 'https://example.com/one-piece' })
  @IsString()
  target_url: string;

  @ApiPropertyOptional({ example: ['Action', 'Adventure'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];
}
