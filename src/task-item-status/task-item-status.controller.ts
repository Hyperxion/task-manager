import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskItemStatusService } from './task-item-status.service';
import { CreateTaskItemStatusDto } from './dto/create-task-item-status.dto';
import { UpdateTaskItemStatusDto } from './dto/update-task-item-status.dto';

@Controller('task-item-status')
export class TaskItemStatusController {
  constructor(private readonly taskItemStatusService: TaskItemStatusService) {}

  @Post()
  create(@Body() createTaskItemStatusDto: CreateTaskItemStatusDto) {
    return this.taskItemStatusService.create(createTaskItemStatusDto);
  }

  @Get()
  findAll() {
    return this.taskItemStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskItemStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskItemStatusDto: UpdateTaskItemStatusDto) {
    return this.taskItemStatusService.update(+id, updateTaskItemStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskItemStatusService.remove(+id);
  }
}
