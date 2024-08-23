import { Module } from '@nestjs/common';
import { TaskItemService } from './task-item.service';
import { TaskItemController } from './task-item.controller';
import { TaskItem } from './entities/task-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskItemRepository } from './task-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskItem])],
  controllers: [TaskItemController],
  providers: [TaskItemService, TaskItemRepository],
  exports: [TaskItemService],
})
export class TaskItemModule {}
