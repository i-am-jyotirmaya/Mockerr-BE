import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaType } from 'mongoose';
import { Answer } from './answer.schema';

export type SubmissionDocument = Submission & Document;

@Schema()
export class Submission {
  @Prop({ required: true })
  name: string;

  @Prop({ type: SchemaType.Types.Date, required: true })
  submitted_on: Date;

  @Prop({ required: true })
  score: number;

  @Prop({
    type: [{ type: SchemaType.Types.ObjectId, ref: 'Answer' }],
    required: true,
  })
  answers: Answer[];
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
