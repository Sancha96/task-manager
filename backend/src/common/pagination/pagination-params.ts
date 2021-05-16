import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationParams {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  take?: number;
}
