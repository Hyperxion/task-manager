import { Column, Entity } from 'typeorm';
import { EntityTemplate } from '../../interfaces/entityTemplate';

@Entity()
export class TaskItemStatus extends EntityTemplate {
  @Column()
  name: string;
}
