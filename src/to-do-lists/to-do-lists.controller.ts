import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ToDoListsService } from './to-do-lists.service';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { UpdateToDoListDto } from './dto/update-to-do-list.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { GetUserId } from '../auth/getUserId.decorator';
import { ShareListDto } from './dto/share-list.dto';

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

  @Get('/current')
  async findAllByUserId(@GetUserId() userId: string) {
    return await this.toDoListsService.findAllByUserId(userId);
  }

  @Get()
  async findAll() {
    return this.toDoListsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.toDoListsService.findOne({ where: { id } });
  }

  @Patch('/share/:id')
  async shareList(
    @Param('id') toDoListId: string,
    @Body() userIds: string[],
    @GetUserId() currentUserId: string,
  ) {
    const shareListDto: ShareListDto = {
      toDoListId,
      userIds,
    };

    shareListDto.userIds.push(currentUserId);

    const toDoList = await this.toDoListsService.findOne({
      where: { id: toDoListId, users: { id: currentUserId } },
    });

    if (!toDoList) throw new UnauthorizedException();

    return await this.toDoListsService.shareList(shareListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDoListsService.remove(+id);
  }
}
