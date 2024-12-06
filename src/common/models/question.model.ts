import { BaseModel } from "./base.model";
import { QuestionUserAnswerModel } from "./question-user-answer.model";

export class QuestionModel extends BaseModel {
  title!: string;
  maxLimitCharacters!: number;
  minLimitCharacters!: number;
  subject!: string;
  questionUserAnswers?: [QuestionUserAnswerModel];

  //used on front
  selected!: boolean;

  constructor(j?: any) {
    super(j);
    if (j) {
      this.title = j.title;
      this.maxLimitCharacters = j.maxLimitCharacters;
      this.minLimitCharacters = j.minLimitCharacters;
      this.subject = j.subject;
      this.questionUserAnswers = j.questionUserAnswers;

      this.selected = j.selected;
    }
  }
}