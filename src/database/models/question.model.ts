import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base.model';
import { Answer } from './answer.model';
import { OptionDto } from 'src/commons/dtos/option.dto';
import { Quiz } from './quiz.model';

@Entity('question')
export class Question extends Base {
  @Column({ type: 'varchar', length: 250, nullable: false })
  description: string;

  @Column({ type: 'json', nullable: false })
  options: OptionDto;

  @Column({ type: 'int', nullable: false })
  correct_choice_index: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.id, { nullable: false })
  quiz: Quiz;
}
