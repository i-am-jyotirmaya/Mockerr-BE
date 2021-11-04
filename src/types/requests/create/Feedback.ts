import { IsString } from 'class-validator';

export default class Feedback {
  @IsString()
  question: string;

  @IsString()
  type: 'boolean' | 'rating' | 'text';
}
