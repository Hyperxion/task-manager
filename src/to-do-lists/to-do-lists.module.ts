import { Module } from '@nestjs/common';
import { ToDoListsService } from './to-do-lists.service';
import { ToDoListsController } from './to-do-lists.controller';
import { ToDoList } from './entities/to-do-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoListRepository } from './to-do-lists.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoList])],
  controllers: [ToDoListsController],
  providers: [ToDoListsService, ToDoListRepository],
  exports: [ToDoListsService],
})
export class ToDoListsModule {}
