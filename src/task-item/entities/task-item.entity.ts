import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { EntityTemplate } from '../../interfaces/entityTemplate';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

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

  @ManyToOne(() => User, (user) => user.taskItems)
  user: Relation<User>;
}
