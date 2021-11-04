import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuizTypeDocument = QuizType & Document;

@Schema()
export class QuizType {
  @Prop({ required: true })
  name: string;
}

export const QuizTypeSchema = SchemaFactory.createForClass(QuizType);
