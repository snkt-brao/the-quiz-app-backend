import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base.model';
import { User } from './user.model';
import { Quiz } from './quiz.model';
import { Question } from './question.model';
import { Result } from './result.model';

@Entity('answer')
export class Answer extends Base {
  @Column({ type: 'int', nullable: false })
  selected_choice_index: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  is_correct: boolean;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.id, { nullable: false })
  quiz: Quiz;

  @ManyToOne(() => Question, (question) => question.id, { nullable: false })
  question: Question;

  @ManyToOne(() => Result, (result) => result.answers)
  result: Result;
}
