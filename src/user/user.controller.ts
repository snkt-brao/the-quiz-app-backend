import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/commons/dtos/create.user.dto';
import { AnswerSubmitRequestDto } from 'src/commons/dtos/answer.submit.request.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  public async register(
    @Body() request: CreateUserDto,
  ): Promise<CreateUserDto> {
    const user = await this.userService.register(request);
    return { name: user.name, email: user.email };
  }

  @Post('answer/:user_id')
  public async submitAnswer(
    @Param() param: { user_id: number },
    @Body() request: AnswerSubmitRequestDto,
  ): Promise<string> {
    const user_id = param.user_id;
    return await this.userService.submitAnswer(user_id, request);
  }

  @Get('result/:user_id/:quiz_id')
  public async getResult(@Param() param: { user_id: number; quiz_id: number }) {
    const { user_id, quiz_id } = param;
    return await this.userService.getResult(user_id, quiz_id);
  }
}
