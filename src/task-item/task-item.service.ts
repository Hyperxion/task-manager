import { Injectable } from '@nestjs/common';
import { CreateTaskItemDto } from './dto/create-task-item.dto';
import { UpdateTaskItemDto } from './dto/update-task-item.dto';
import { TaskItemRepository } from './task-item.repository';

@Injectable()
export class TaskItemService {
  constructor(private taskItemRepository: TaskItemRepository) {}

  async update(updateTaskItemDto: UpdateTaskItemDto) {
    return this.taskItemRepository.updateStatus(updateTaskItemDto);
  }

  async isTaskItemOwner(taskItemId: string, userId: string) {
    const list = await this.taskItemRepository.findOne({
      where: { id: taskItemId },
      select: {
        toDoList: {
          id: true,
          users: {
            id: true,
          },
        },
      },
      relations: {
        toDoList: {
          users: true,
        },
      },
    });

    const users = list.toDoList.users;

    if (users.some((obj) => obj.id === userId)) return true;
  }
}
