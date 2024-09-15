import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base.model';
import { User } from './user.model';
import { Quiz } from './quiz.model';
import { QuizStatus } from 'src/commons/enums/quiz.status.enum';

@Entity('user_quiz')
export class UserQuiz extends Base {
  @Column({
    type: 'enum',
    enum: QuizStatus,
    default: QuizStatus.NOT_STARTED,
    nullable: false,
  })
  status: QuizStatus;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.id, { nullable: false })
  quiz: Quiz;
}
