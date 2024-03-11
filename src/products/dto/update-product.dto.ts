import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly description?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly price?: number;
}
