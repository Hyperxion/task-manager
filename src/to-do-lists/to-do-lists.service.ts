import { Injectable } from '@nestjs/common';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { UpdateToDoListDto } from './dto/update-to-do-list.dto';

@Injectable()
export class ToDoListsService {
  create(createToDoListDto: CreateToDoListDto) {
    return 'This action adds a new toDoList';
  }

  findAll() {
    return `This action returns all toDoLists`;
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
