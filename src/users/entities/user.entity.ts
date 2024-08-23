import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  Relation,
} from 'typeorm';
import { EntityTemplate } from '../../interfaces/entityTemplate';
import { ToDoList } from '../../to-do-lists/entities/to-do-list.entity';
import { TaskItem } from '../../task-item/entities/task-item.entity';

@Entity()
export class User extends EntityTemplate {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => ToDoList, (toDoList) => toDoList.users, { cascade: true })
  @JoinTable()
  toDoLists: Relation<ToDoList[]>;

  @OneToMany(() => TaskItem, (taskItem) => taskItem.user)
  taskItems: Relation<TaskItem>[];
}
