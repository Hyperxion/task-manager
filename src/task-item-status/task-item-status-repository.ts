import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TaskItemStatus } from './entities/task-item-status.entity';

@Injectable()
export class TaskItemStatusRepository extends Repository<TaskItemStatus> {
  constructor(dataSource: DataSource) {
    super(TaskItemStatus, dataSource.createEntityManager());
  }
}
