import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';


@Module({
  imports: [DatabaseModule, UserModule, QuizModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
