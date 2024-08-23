import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ToDoList } from './entities/to-do-list.entity';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { processError } from '../constants';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ToDoListRepository extends Repository<ToDoList> {
  constructor(dataSource: DataSource) {
    super(ToDoList, dataSource.createEntityManager());
  }

  async createToDoList(createToDoListDto: CreateToDoListDto) {
    try {
      const toDoList = this.create(createToDoListDto);
      const user = await this.manager.getRepository(User).findOne({
        where: { id: createToDoListDto.userId },
        select: ['id'],
      });
      if (!user)
        throw new NotFoundException(`User with ID ${createToDoListDto.userId}`);

      toDoList.users = [user];
      await this.save(toDoList);

      return toDoList.id;
    } catch (error) {
      processError(error, ToDoList.name);
    }
  }
}
