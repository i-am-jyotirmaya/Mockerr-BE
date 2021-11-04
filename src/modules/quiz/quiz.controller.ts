import { Body, Controller, Post } from '@nestjs/common';
import CreateQuiz from 'src/types/requests/create';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post('createtypes')
  async createTypesAsync() {
    const res = await this.quizService.createQuizTypes();
    return { res };
  }

  @Post()
  async createAsync(@Body() createQuiz: CreateQuiz) {
    const res = await this.quizService.createQuiz(createQuiz);
    return res;
  }
}
