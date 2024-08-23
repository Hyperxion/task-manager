import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, OneToMany, Relation } from 'typeorm';
import { EntityTemplate } from '../../interfaces/entityTemplate';
import { User } from '../../users/entities/user.entity';
import { TaskItem } from '../../task-item/entities/task-item.entity';

@Entity()
export class ToDoList extends EntityTemplate {
  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.toDoLists)
  users: Relation<User[]>;

  @OneToMany(() => TaskItem, (taskItem) => taskItem.toDoList)
  taskItems: Relation<TaskItem>;
}
