import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ToDoList } from './entities/to-do-list.entity';

@Injectable()
export class ToDoListRepository extends Repository<ToDoList> {
  constructor(dataSource: DataSource) {
    super(ToDoList, dataSource.createEntityManager());
  }
}
