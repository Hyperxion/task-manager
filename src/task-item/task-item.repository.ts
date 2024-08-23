import { DataSource, Repository } from 'typeorm';
import { TaskItem } from './entities/task-item.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskItemRepository extends Repository<TaskItem> {
  constructor(dataSource: DataSource) {
    super(TaskItem, dataSource.createEntityManager());
  }
}
