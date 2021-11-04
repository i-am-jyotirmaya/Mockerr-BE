import Feedback from './Feedback';
import Question from './Question';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export default class CreateQuiz {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Question)
  @IsNotEmpty()
  questions: Question[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Feedback)
  feedback: Feedback[];

  @IsBoolean()
  isPublic: boolean;
}
