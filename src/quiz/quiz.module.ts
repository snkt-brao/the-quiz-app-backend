import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/database/models/answer.model';
import { Question } from 'src/database/models/question.model';
import { Quiz } from 'src/database/models/quiz.model';
import { Result } from 'src/database/models/result.model';
import { UserQuiz } from 'src/database/models/user.quiz.model';
import { User } from 'src/database/models/user.model';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Answer, Question, Quiz, Result, UserQuiz, User]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
