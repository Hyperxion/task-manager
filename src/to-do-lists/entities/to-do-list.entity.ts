import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, Relation } from 'typeorm';
import { EntityTemplate } from '../../interfaces/entityTemplate';
import { User } from '../../users/entities/user.entity';

@Entity()
export class ToDoList extends EntityTemplate {
  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.toDoLists)
  users: Relation<User[]>;
}
