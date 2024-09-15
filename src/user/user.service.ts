import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerResponseDto } from 'src/commons/dtos/answer.response.dto';
import { AnswerSubmitRequestDto } from 'src/commons/dtos/answer.submit.request.dto';
import { CreateUserDto } from 'src/commons/dtos/create.user.dto';
import { QuestionResponseDto } from 'src/commons/dtos/question.response.dto';
import { QuizStatus } from 'src/commons/enums/quiz.status.enum';
import { ApiError } from 'src/commons/errrors/api.error';
import { Answer } from 'src/database/models/answer.model';
import { Question } from 'src/database/models/question.model';
import { Quiz } from 'src/database/models/quiz.model';
import { Result } from 'src/database/models/result.model';
import { User } from 'src/database/models/user.model';
import { UserQuiz } from 'src/database/models/user.quiz.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
    @InjectRepository(Answer) private answerRepository: Repository<Answer>,
    @InjectRepository(Result) private resultRepository: Repository<Result>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(UserQuiz)
    private userQuizRepository: Repository<UserQuiz>,
  ) {}

  public async register(userRequest: CreateUserDto): Promise<CreateUserDto> {
    let user: CreateUserDto | null = await this.userRepository.findOneBy({
      email: userRequest.email,
    });

    if (user) {
      throw new ApiError({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'user with given email id is already exist',
      });
    }

    user = await this.userRepository.save({
      name: userRequest.name,
      email: userRequest.email,
    });

    return user;
  }

  public async submitAnswer(
    userId: number,
    request: AnswerSubmitRequestDto,
  ): Promise<string> {
    const [user, quiz, question] = await Promise.all([
      this.userRepository.findOne({ where: { id: userId } }),
      this.quizRepository.findOne({ where: { id: request.quizId } }),
      this.questionRepository.findOne({
        where: { quiz: { id: request.quizId }, id: request.questionId },
      }),
    ]);

    if (!user)
      throw new ApiError({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'user not found',
      });
    if (!quiz)
      throw new ApiError({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'quiz not found',
      });
    if (!question)
      throw new ApiError({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'question does not belong to the quiz',
      });

    const userQuiz = await this.userQuizRepository.findOne({
      where: { quiz: { id: quiz.id }, user: { id: user.id } },
    });

    if (!userQuiz)
      throw new ApiError({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'user not registered for the quiz',
      });

    const answer = await this.answerRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        quiz: { id: request.quizId },
        question: { id: request.questionId },
      },
    });

    if (answer) {
      throw new ApiError({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'question already answered by the user',
      });
    }

    let result = await this.resultRepository.findOne({ where: { quiz, user } });
    if (!result) result = await this.resultRepository.save({ quiz, user });

    const isCorrect =
      request.selectedChoiceIndex === question.correct_choice_index;

    const answerResponse = await this.answerRepository.save({
      is_correct: isCorrect,
      question,
      quiz,
      result,
      selected_choice_index: request.selectedChoiceIndex,
      user,
    });

    await this.calculateScore(userId, request.quizId);

    return 'success';
  }

  async calculateScore(userId: number, quizId: number) {
    const answer: Answer[] = await this.answerRepository.find({
      where: {
        user: { id: userId },
        quiz: { id: quizId },
      },

      relations: ['quiz', 'quiz.questions'],
    });

    const questions: Question[] = answer[0].quiz.questions;
    const totalQuestion = questions.length;
    const solvedQuestion = answer.filter((ans) => ans.is_correct).length;

    const score = (solvedQuestion / totalQuestion) * 100;

    await this.resultRepository
      .createQueryBuilder()
      .update(Result)
      .set({ score: score })
      .where('user.id = :userId', { userId })
      .andWhere('quiz.id = :quizId', { quizId })
      .execute();
  }

  public async getResult(userId: number, quizId: number) {
    const result = await this.resultRepository.findOne({
      where: {
        user: { id: userId },
        quiz: { id: quizId },
      },
      relations: ['answers', 'quiz', 'quiz.questions', 'answers.question'],
    });

    if (!result) {
      throw new ApiError({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'no result found for given id and given quiz',
      });
    }

    const score = result.score;

    const answerResponse: AnswerResponseDto[] = result.answers.map((ans) => {
      const question = result.quiz.questions.find(
        (que) => ans.question.id === que.id,
      );
      return {
        question: {
          title: question.description,
          options: question.options,
        },
        selectedOption: question.options[ans.selected_choice_index],
        isCorrect: ans.is_correct,
      };
    });

    return {
      score,
      answerResponse,
    };
  }
}
