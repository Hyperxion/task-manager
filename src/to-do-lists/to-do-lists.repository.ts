import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ToDoList } from './entities/to-do-list.entity';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { processError } from '../constants';
import { User } from '../users/entities/user.entity';
import { ShareListDto } from './dto/share-list.dto';

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
        throw new NotFoundException(
          `${User.name} with ID ${createToDoListDto.userId}`,
        );

      toDoList.users = [user];
      await this.save(toDoList);

      return toDoList.id;
    } catch (error) {
      processError(error, ToDoList.name);
    }
  }

  async shareList(shareListDto: ShareListDto) {
    const toDoList = await this.findOne({
      where: { id: shareListDto.toDoListId },
    });
    const userRepository = await this.manager.getRepository(User);
    const userIds = shareListDto.userIds;
    const users: User[] = [];

    if (!toDoList)
      throw new NotFoundException(
        `${ToDoList.name} with ID ${shareListDto.toDoListId}`,
      );

    for (const userId of userIds) {
      const user = await userRepository.findOne({ where: { id: userId } });

      if (!user)
        throw new NotFoundException(
          `${User.name} with ID ${shareListDto.toDoListId}`,
        );

      users.push(user);
    }

    await this.manager.transaction(async (transactionalEntityManager) => {
      toDoList.users = [];
      await this.save(toDoList);

      toDoList.users = users;
      await this.save(toDoList);
    });

    return shareListDto.toDoListId;
  }
}
