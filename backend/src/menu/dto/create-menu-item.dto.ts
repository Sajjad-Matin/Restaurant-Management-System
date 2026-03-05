import { IsString, IsOptional, IsNumber, IsBoolean, IsArray, ValidateNested, IsEnum, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { VariantType } from '@prisma/client';

export class CreateVariantDto {
  @IsEnum(VariantType)
  type: VariantType;

  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  priceModifier?: number;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsInt()
  @IsOptional()
  sortOrder?: number;
}

export class CreateMenuItemDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  basePrice: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  categoryId: string;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsInt()
  @IsOptional()
  sortOrder?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  @IsOptional()
  variants?: CreateVariantDto[];
}