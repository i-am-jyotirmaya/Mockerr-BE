import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaType } from 'mongoose';
import { Option } from './option.schema';
import { Question } from './question.schema';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @Prop({ type: SchemaType.Types.ObjectId, ref: 'Question', required: true })
  question: Question;

  @Prop({ type: SchemaType.Types.ObjectId, ref: 'Option', required: true })
  option: Option;
}

export const SubmissionSchema = SchemaFactory.createForClass(Answer);
