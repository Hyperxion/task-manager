import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../BaseRepository';
import { ToDoList } from './entities/to-do-list.entity';

@Injectable()
export class ToDoListRepository extends BaseRepository<ToDoList> {
  constructor(dataSource: DataSource) {
    super(ToDoList, dataSource);
  }
}
