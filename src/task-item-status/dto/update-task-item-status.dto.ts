import { PartialType } from '@nestjs/swagger';
import { CreateTaskItemStatusDto } from './create-task-item-status.dto';

export class UpdateTaskItemStatusDto extends PartialType(CreateTaskItemStatusDto) {}
