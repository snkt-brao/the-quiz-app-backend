import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Base } from './base.model';
import { Answer } from './answer.model';

@Entity('users')
export class User extends Base {
  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  email: string;

  @OneToMany(() => Answer, (answer) => answer.id)
  answers: Answer[];
}
