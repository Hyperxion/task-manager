import { Injectable } from '@nestjs/common';
import { CreateTaskItemDto } from './dto/create-task-item.dto';
import { UpdateTaskItemDto } from './dto/update-task-item.dto';

@Injectable()
export class TaskItemService {
  create(createTaskItemDto: CreateTaskItemDto) {
    return 'This action adds a new taskItem';
  }

  findAll() {
    return `This action returns all taskItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskItem`;
  }

  update(id: number, updateTaskItemDto: UpdateTaskItemDto) {
    return `This action updates a #${id} taskItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskItem`;
  }
}
