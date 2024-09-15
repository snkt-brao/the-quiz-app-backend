import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQuizDto } from 'src/commons/dtos/create.quiz.dto';
import { QuestionResponseDto } from 'src/commons/dtos/question.response.dto';
import { QuizResponseDto } from 'src/commons/dtos/quiz.response.dto';
import { QuizStatus } from 'src/commons/enums/quiz.status.enum';
import { ApiError } from 'src/commons/errrors/api.error';
import { Question } from 'src/database/models/question.model';
import { Quiz } from 'src/database/models/quiz.model';
import { User } from 'src/database/models/user.model';
import { UserQuiz } from 'src/database/models/user.quiz.model';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(UserQuiz)
    private userQuizRepository: Repository<UserQuiz>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async register(user_id: number, quiz_id: number): Promise<string> {
    const status = QuizStatus.NOT_STARTED;
    const user: User = await this.userRepository.findOne({
      where: { id: user_id },
    });

    if (user === null || user === undefined) {
      throw new ApiError({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'invalid user id',
      });
    }

    const quiz = await this.quizRepository.findOne({ where: { id: user_id } });

    if (quiz === null || quiz === undefined) {
      throw new ApiError({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'invalid quiz',
      });
    }

    const userQuiz = await this.userQuizRepository.save({
      quiz,
      user,
      status,
    });

    console.log(userQuiz);

    if (userQuiz === null) {
      throw new ApiError({
        statusCode: HttpStatus.BAD_REQUEST,
        error:
          'enable to register at the moment for the quiz, Please try again later',
      });
    }

    return 'success';
  }
  public async getQuiz(id: number): Promise<QuizResponseDto> {
    const quiz: Quiz = await this.quizRepository.findOne({
      where: { id },
      relations: ['questions'], // This tells TypeORM to load the related questions
    });

    console.log(quiz);

    if (quiz === null) {
      throw new ApiError({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Quiz not found',
      });
    }
    return this.formQuizResponseDto(quiz, quiz.questions);
  }

  public async createQuiz(request: createQuizDto): Promise<QuizResponseDto> {
    const { quizTitle, questions } = request;

    const quizResponse = await this.quizRepository.save({
      quiz_title: quizTitle,
    });

    const questionsToSave = questions.map((question) => ({
      description: question.questionDesc,
      options: question.option,
      correct_choice_index: question.correctChoiceIndex,
      quiz: quizResponse,
    }));

    const questionResponses =
      await this.questionRepository.save(questionsToSave);

    return this.formQuizResponseDto(quizResponse, questionResponses);
  }

  private formQuizResponseDto(
    quiz: Quiz,
    questions: Question[],
  ): QuizResponseDto {
    const questionResponseArr: QuestionResponseDto[] = questions.map((q) => ({
      title: q.description,
      options: q.options,
    }));

    return {
      title: quiz.quiz_title,
      questions: questionResponseArr,
    };
  }
}
