import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ToDoListsService } from './to-do-lists.service';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { UpdateToDoListDto } from './dto/update-to-do-list.dto';

@Controller('to-do-lists')
export class ToDoListsController {
  constructor(private readonly toDoListsService: ToDoListsService) {}

  @Post()
  create(@Body() createToDoListDto: CreateToDoListDto) {
    return this.toDoListsService.create(createToDoListDto);
  }

  @Get()
  findAll() {
    return this.toDoListsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toDoListsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToDoListDto: UpdateToDoListDto) {
    return this.toDoListsService.update(+id, updateToDoListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDoListsService.remove(+id);
  }
}
