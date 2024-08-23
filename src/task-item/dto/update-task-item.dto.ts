import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskItemDto } from './create-task-item.dto';
import { IsUUID } from 'class-validator';

export class UpdateTaskItemDto extends PartialType(CreateTaskItemDto) {
  @ApiProperty()
  @IsUUID()
  taskItemStatusId: string;
}
