import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ToDoListsService } from './to-do-lists.service';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { GetUserId } from '../auth/getUserId.decorator';
import { ShareListDto } from './dto/share-list.dto';
import { CreateTaskItemDto } from '../task-item/dto/create-task-item.dto';

@ApiTags('to-do-lists')
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

  @Patch('/:id/task')
  async assignTask(
    @Body() createTaskItemDto: CreateTaskItemDto,
    @Param('id') toDoListId: string,
    @GetUserId() userId: string,
  ) {
    const toDoList = await this.toDoListsService.findOne({
      where: { id: toDoListId, users: { id: userId } },
    });

    if (!toDoList) throw new NotFoundException();

    createTaskItemDto.toDoListId = toDoListId;

    return await this.toDoListsService.assignTask(createTaskItemDto);
  }

  @Get('/current')
  async findAllByUserId(@GetUserId() userId: string) {
    return await this.toDoListsService.findAllByUserId(userId);
  }

  @Get()
  async findAll() {
    return this.toDoListsService.findAll();
  }

  @Patch('/share/:id')
  async shareList(
    @Param('id') toDoListId: string,
    @Body() userIds: string[],
    @GetUserId() userId: string,
  ) {
    const shareListDto: ShareListDto = {
      toDoListId,
      userIds,
    };

    shareListDto.userIds.push(userId);

    const toDoList = await this.toDoListsService.findOne({
      where: { id: toDoListId, users: { id: userId } },
    });

    if (!toDoList) throw new NotFoundException();

    return await this.toDoListsService.shareList(shareListDto);
  }
}
