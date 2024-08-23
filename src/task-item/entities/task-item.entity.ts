import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Relation,
} from 'typeorm';
import { EntityTemplate } from '../../interfaces/entityTemplate';
import { ApiProperty } from '@nestjs/swagger';
import { ToDoList } from '../../to-do-lists/entities/to-do-list.entity';
import { TaskItemStatus } from '../../task-item-status/entities/task-item-status.entity';

@Entity()
export class TaskItem extends EntityTemplate {
  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  deadline: Date;

  @ManyToOne(() => ToDoList, (toDoList) => toDoList.taskItems)
  @JoinColumn()
  toDoList: Relation<ToDoList>;

  @OneToOne(() => TaskItemStatus, { eager: true })
  @JoinColumn()
  status: Relation<TaskItemStatus>;
}
