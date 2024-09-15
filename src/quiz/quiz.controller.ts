import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { createQuizDto } from 'src/commons/dtos/create.quiz.dto';
import { QuizResponseDto } from 'src/commons/dtos/quiz.response.dto';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post('new')
  public async createQuiz(
    @Body() request: createQuizDto,
  ): Promise<QuizResponseDto> {
    return await this.quizService.createQuiz(request);
  }

  @Get(':id')
  public async getQuiz(
    @Param() param: { id: number },
  ): Promise<QuizResponseDto> {
    const id = param.id;
    return await this.quizService.getQuiz(id);
  }

  @Post('register/:quiz_id/:user_id')
  public async register(
    @Param() param: { quiz_id: number; user_id: number },
  ): Promise<string> {
    const { user_id, quiz_id } = param;
    return await this.quizService.register(user_id, quiz_id);
  }
}
