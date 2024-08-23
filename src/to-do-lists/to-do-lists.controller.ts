import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ToDoListsService } from './to-do-lists.service';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { UpdateToDoListDto } from './dto/update-to-do-list.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { GetUserId } from '../auth/getUserId.decorator';

@ApiTags('Stores')
@UseGuards(AuthGuard)
@Controller('to-do-lists')
export class ToDoListsController {
  constructor(private readonly toDoListsService: ToDoListsService) {}

  @Post()
  async create(
    @Body() createToDoListDto: CreateToDoListDto,
    @GetUserId() userId: string,
  ) {
    createToDoListDto.userId = userId;
    return await this.toDoListsService.create(createToDoListDto);
  }

  @Get()
  async findAll(@GetUserId() userId: string) {
    return this.toDoListsService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toDoListsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateToDoListDto: UpdateToDoListDto,
  ) {
    return this.toDoListsService.update(+id, updateToDoListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDoListsService.remove(+id);
  }
}
