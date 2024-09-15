import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Base } from './base.model';
import { Answer } from './answer.model';
import { Question } from './question.model';

@Entity('quiz')
export class Quiz extends Base {
  @Column({ type: 'varchar', length: 150, nullable: false })
  quiz_title: string;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}
