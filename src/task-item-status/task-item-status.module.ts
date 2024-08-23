import { Module } from '@nestjs/common';
import { TaskItemStatusService } from './task-item-status.service';
import { TaskItemStatusController } from './task-item-status.controller';
import { TaskItemStatus } from './entities/task-item-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskItemStatusRepository } from './task-item-status-repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskItemStatus])],
  controllers: [TaskItemStatusController],
  providers: [TaskItemStatusService, TaskItemStatusRepository],
  exports: [TaskItemStatusService],
})
export class TaskItemStatusModule {}
