import { IsArray, IsNumber, IsString } from 'class-validator';

export default class Question {
  @IsString()
  text: string;

  @IsArray()
  options: string[];

  @IsNumber()
  correctOptionIndex: number;
}
