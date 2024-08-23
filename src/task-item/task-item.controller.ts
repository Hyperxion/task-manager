import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskItemService } from './task-item.service';
import { CreateTaskItemDto } from './dto/create-task-item.dto';
import { UpdateTaskItemDto } from './dto/update-task-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('task-items')
@UseGuards(AuthGuard)
@Controller('task-item')
export class TaskItemController {
  constructor(private readonly taskItemService: TaskItemService) {}

  @Post()
  async create(@Body() createTaskItemDto: CreateTaskItemDto) {
    return this.taskItemService.create(createTaskItemDto);
  }

  @Get()
  findAll() {
    return this.taskItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskItemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskItemDto: UpdateTaskItemDto,
  ) {
    return this.taskItemService.update(+id, updateTaskItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskItemService.remove(+id);
  }
}
