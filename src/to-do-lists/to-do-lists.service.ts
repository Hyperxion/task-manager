import { Injectable } from '@nestjs/common';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { UpdateToDoListDto } from './dto/update-to-do-list.dto';
import { ToDoListRepository } from './to-do-lists.repository';
import { ShareListDto } from './dto/share-list.dto';
import { ToDoList } from './entities/to-do-list.entity';
import { FindOneOptions } from 'typeorm';
import { CreateTaskItemDto } from '../task-item/dto/create-task-item.dto';

@Injectable()
export class ToDoListsService {
  constructor(private toDoListRepository: ToDoListRepository) {}

  async create(createToDoListDto: CreateToDoListDto) {
    return await this.toDoListRepository.createToDoList(createToDoListDto);
  }

  async assignTask(createTaskItemDto: CreateTaskItemDto) {
    return await this.toDoListRepository.assignTask(createTaskItemDto);
  }

  async findAllByUserId(userId: string) {
    return await this.toDoListRepository.find({
      where: { users: [{ id: userId }] },
      select: {
        users: {
          id: true,
          username: true,
        },
      },
      relations: {
        users: true,
        taskItems: true,
      },
    });
  }

  async findAll() {
    return await this.toDoListRepository.find({
      select: {
        users: {
          id: true,
          username: true,
        },
      },
      relations: {
        users: true,
        taskItems: true,
      },
    });
  }

  async shareList(shareListDto: ShareListDto) {
    return await this.toDoListRepository.shareList(shareListDto);
  }

  async findOne(options?: FindOneOptions<ToDoList>) {
    return await this.toDoListRepository.findOne(options);
  }

  update(id: number, updateToDoListDto: UpdateToDoListDto) {
    return `This action updates a #${id} toDoList`;
  }

  remove(id: number) {
    return `This action removes a #${id} toDoList`;
  }
}
