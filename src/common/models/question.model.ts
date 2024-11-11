import { BaseModel } from "./base.model";
import { QuestionUserAnswerModel } from "./question-user-answer.model";

export class QuestionModel extends BaseModel {
  title!: string;
  maxLimitCharacters!: number;
  minLimitCharacters!: number;
  chapterId!: number;
  subject!: string;

  //used on front
  selected!: boolean;
  questionUserAnswer!: QuestionUserAnswerModel;

  constructor(j?: any) {
    super(j);
    if (j) {
      this.title = j.title;
      this.maxLimitCharacters = j.maxLimitCharacters;
      this.minLimitCharacters = j.minLimitCharacters;
      this.chapterId = j.chapterId;
      this.subject = j.subject;

      this.selected = j.selected;
      this.questionUserAnswer = j.questionUserAnswer;
    }
  }
}