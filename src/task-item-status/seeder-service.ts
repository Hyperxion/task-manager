import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskItemStatus } from './entities/task-item-status.entity';
import { Constants } from '../constants';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(TaskItemStatus)
    private readonly TaskItemStatusRepository: Repository<TaskItemStatus>,
  ) {}

  async onModuleInit() {
    await this.seedDatabase();
  }

  private async seedDatabase() {
    const count = await this.TaskItemStatusRepository.count();

    if (count === 0) {
      const insertScripts = [
        { id: Constants.TaskStatus.Active, name: 'Aktívny' },
        { id: Constants.TaskStatus.Cancelled, name: 'Zrušený' },
        { id: Constants.TaskStatus.Finished, name: 'Dokončený' },
      ];

      await this.TaskItemStatusRepository.save(insertScripts);
      console.log('Successfully seeded Task Statuses');
    }
  }
}
