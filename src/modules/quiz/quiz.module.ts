import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Option, OptionSchema } from 'src/data/schemas/option.schema';
import { Question, QuestionSchema } from 'src/data/schemas/question.schema';
import { Quiz, QuizSchema } from 'src/data/schemas/quiz.schema';
import { QuizType, QuizTypeSchema } from 'src/data/schemas/quizTypes.schema';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: QuizType.name, schema: QuizTypeSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: Option.name, schema: OptionSchema },
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
