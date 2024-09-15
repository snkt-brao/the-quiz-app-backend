import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/database/models/answer.model';
import { Question } from 'src/database/models/question.model';
import { Quiz } from 'src/database/models/quiz.model';
import { Result } from 'src/database/models/result.model';
import { UserQuiz } from 'src/database/models/user.quiz.model';
import { DatabaseModule } from 'src/database/database.module';
import { User } from 'src/database/models/user.model';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Answer, Question, Quiz, Result, UserQuiz, User]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
