import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.model';
import { Quiz } from './quiz.model';
import { Answer } from './answer.model';
import { Base } from './base.model';

@Entity('result')
export class Result extends Base {
  @Column({ type: 'double', default: 0.0 })
  score: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.id, { nullable: false })
  quiz: Quiz;

  @OneToMany(() => Answer, (answer) => answer.result)
  answers: Answer[];
}
