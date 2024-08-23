import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class CreateTaskItemDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  description: string;

  @ApiProperty()
  @IsDateString()
  deadline: Date;

  toDoListId: string;
}
