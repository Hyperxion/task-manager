import { Injectable } from '@nestjs/common';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { UpdateToDoListDto } from './dto/update-to-do-list.dto';
import { ToDoListRepository } from './to-do-lists.repository';

@Injectable()
export class ToDoListsService {
  constructor(private toDoListRepository: ToDoListRepository) {}

  async create(createToDoListDto: CreateToDoListDto) {
    return await this.toDoListRepository.createToDoList(createToDoListDto);
  }

  async findAllByUserId(userId: string) {
    return await this.toDoListRepository.find({
      where: { users: [{ id: userId }] },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} toDoList`;
  }

  update(id: number, updateToDoListDto: UpdateToDoListDto) {
    return `This action updates a #${id} toDoList`;
  }

  remove(id: number) {
    return `This action removes a #${id} toDoList`;
  }
}
