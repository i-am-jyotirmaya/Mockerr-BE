import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Option, OptionDocument } from 'src/data/schemas/option.schema';
import { Question, QuestionDocument } from 'src/data/schemas/question.schema';
import { Quiz, QuizDocument } from 'src/data/schemas/quiz.schema';
import { QuizType, QuizTypeDocument } from 'src/data/schemas/quizTypes.schema';
import CreateQuiz from 'src/types/requests/create';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(Option.name) private optionModel: Model<OptionDocument>,
    @InjectModel(QuizType.name) private quizTypeModel: Model<QuizTypeDocument>,
  ) {}
  async createQuizTypes() {
    const result = await this.quizTypeModel.insertMany([
      { name: 'set' },
      { name: 'progressive' },
    ]);
    return result.map((e) => e._id);
  }

  async createQuiz(quiz: CreateQuiz) {
    const { questions, name, type, isPublic, feedback } = quiz;
    // Mapping all questions to ObjectIds after inserting into Db
    const questionIds = await Promise.all(
      questions.map(async (question) => {
        let correctOption = '';

        // Mapping all options of the question to ObjectIds after inserting into Db
        const options = await Promise.all(
          question.options.map(async (option, index) => {
            const createdOption = new this.optionModel({
              text: option,
            });
            const res = await createdOption.save(); // Saving option
            const optionId = res.id as string;
            if (question.correctOptionIndex === index) correctOption = optionId;
            return optionId;
          }),
        );

        const createdQuestion = new this.questionModel({
          text: question.text,
          options,
          correct_option: correctOption,
        });

        const saved = await createdQuestion.save(); // Saving question
        const questionId = saved.id as string;
        return questionId;
      }),
    );
    const createdQuiz = new this.quizModel({
      name,
      type,
      questions: questionIds,
      feedback: feedback || [],
      submissions: [],
      is_public: isPublic,
      rating: 0,
      owner: 'j',
    });
    const quizId = await createdQuiz.save(); // Saving quiz
    return quizId;
  }
}
