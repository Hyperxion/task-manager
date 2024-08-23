import { DataSource, Repository } from 'typeorm';
import { TaskItem } from './entities/task-item.entity';
import { Injectable } from '@nestjs/common';
import { UpdateTaskItemDto } from './dto/update-task-item.dto';

@Injectable()
export class TaskItemRepository extends Repository<TaskItem> {
  constructor(dataSource: DataSource) {
    super(TaskItem, dataSource.createEntityManager());
  }

  async updateStatus(updateTaskItemDto: UpdateTaskItemDto) {
    return await this.manager
      .createQueryBuilder()
      .update(TaskItem)
      .set({ status: updateTaskItemDto.taskItemStatusId })
      .where('id = :id', { id: updateTaskItemDto.id })
      .execute();
  }
}
