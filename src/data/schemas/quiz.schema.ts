import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';
import { BOOL, RATING, TEXT } from 'src/constants';
import { Question } from './question.schema';
import { QuizType } from './quizTypes.schema';
import { Submission } from './submission.schema';

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
  @Prop({ required: true })
  name: string;

  @Prop({ type: SchemaType.Types.ObjectId, ref: 'QuizType', required: true })
  type: QuizType;

  @Prop({
    type: [
      { type: SchemaType.Types.ObjectId, ref: 'Question', required: true },
    ],
    default: [],
  })
  questions: Question[];

  @Prop({
    type: [
      raw({
        question: { type: String, required: true },
        type: { type: String, required: true, enum: [RATING, BOOL, TEXT] },
      }),
    ],
    required: true,
    default: [],
  })
  feedback: Record<string, any>;

  @Prop({
    type: [
      { type: SchemaType.Types.ObjectId, ref: 'Submission', required: true },
    ],
    default: [],
  })
  submissions: Submission[];

  @Prop({ required: true, default: false })
  is_public: boolean;

  @Prop({ type: SchemaType.Types.Number, required: true, default: 0 })
  rating: number;

  @Prop({ required: true })
  owner: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
