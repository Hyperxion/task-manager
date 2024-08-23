import { Module } from '@nestjs/common';
import { TaskItemStatus } from './entities/task-item-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder-service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskItemStatus])],
  controllers: [],
  providers: [SeederService],
  exports: [],
})
export class TaskItemStatusModule {}
