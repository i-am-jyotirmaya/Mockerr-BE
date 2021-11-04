import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as SchemaType } from 'mongoose';
import { Option } from './option.schema';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop({ required: true })
  text: string;

  @Prop({
    type: [{ type: SchemaType.Types.ObjectId, ref: 'Option', required: true }],
  })
  options: Option[];

  @Prop({ type: SchemaType.Types.ObjectId, required: true })
  correct_option: ObjectId;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
