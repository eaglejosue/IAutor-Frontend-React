import { BaseModel } from "./base.model";

export class QuestionModel extends BaseModel {
    title!: string;
    maxLimitCharacters!:number;
    minLimitCharacters!:number;
    chapterId!:number;
    selected!:boolean;
    subject!:string;

    constructor(j?: any) {
      super(j);
      if (j) {
        this.title = j.title;
        this.maxLimitCharacters = j.maxLimitCharacters;
        this.minLimitCharacters = j.minLimitCharacters;
        this.chapterId = j.chapterId;
        this.selected = j.selected;
        this.subject = j.subject;
      }
    }
  }
  