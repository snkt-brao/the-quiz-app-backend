import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './models/answer.model';
import { Question } from './models/question.model';
import { Quiz } from './models/quiz.model';
import { Result } from './models/result.model';
import { UserQuiz } from './models/user.quiz.model';
import { User } from './models/user.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'thequizapp',
      entities: [Answer, Question, Quiz, Result, UserQuiz, User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
