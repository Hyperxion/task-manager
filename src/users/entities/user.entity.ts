import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { EntityTemplate } from '../../interfaces/entityTemplate';

@Entity()
export class User extends EntityTemplate {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
