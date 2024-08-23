import { Injectable } from '@nestjs/common';
import { CreateTaskItemStatusDto } from './dto/create-task-item-status.dto';
import { UpdateTaskItemStatusDto } from './dto/update-task-item-status.dto';

@Injectable()
export class TaskItemStatusService {
  create(createTaskItemStatusDto: CreateTaskItemStatusDto) {
    return 'This action adds a new taskItemStatus';
  }

  findAll() {
    return `This action returns all taskItemStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskItemStatus`;
  }

  update(id: number, updateTaskItemStatusDto: UpdateTaskItemStatusDto) {
    return `This action updates a #${id} taskItemStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskItemStatus`;
  }
}
