import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { TaskItemService } from './task-item.service';
import { CreateTaskItemDto } from './dto/create-task-item.dto';
import { UpdateTaskItemDto } from './dto/update-task-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { GetUserId } from '../auth/getUserId.decorator';

@ApiTags('task-items')
@UseGuards(AuthGuard)
@Controller('task-item')
export class TaskItemController {
  constructor(private readonly taskItemService: TaskItemService) {}

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskItemDto: UpdateTaskItemDto,
    @GetUserId() userId: string,
  ) {
    const isAllowed = await this.taskItemService.isTaskItemOwner(id, userId);
    if (!isAllowed) throw new NotFoundException();
    updateTaskItemDto.id = id;

    return await this.taskItemService.update(updateTaskItemDto);
  }
}
