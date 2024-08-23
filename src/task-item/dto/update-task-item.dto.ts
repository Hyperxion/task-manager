import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskItemDto } from './create-task-item.dto';
import {
  IsString,
  MinLength,
  MaxLength,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class UpdateTaskItemDto extends PartialType(CreateTaskItemDto) {
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

  @ApiProperty()
  @IsUUID()
  toDoListId: string;

  @ApiProperty()
  @IsUUID()
  taskItemStatusId: string;
}
