import { BaseModel } from "./base.model";
import { QuestionModel } from "./question.model";

export class ChapterModel extends BaseModel {
  title!: string;
  chapterNumber!: number;
  selected!: boolean;

  //used on front
  questions?: [QuestionModel];

  constructor(j?: any) {
    super(j);
    if (j) {
      this.title = j.title;
      this.chapterNumber = j.chapterNumber;
      this.selected = j.selected;

      this.questions = j.questions;
    }
  }
}
