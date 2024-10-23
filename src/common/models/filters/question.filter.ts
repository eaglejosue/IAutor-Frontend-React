import { BaseModel } from "../base.model";

export class QuestionFilter extends BaseModel {
  title?: string;
  chapterId?:number;
  
  constructor(j?: any) {
    super(j);
    if (j) {
      this.title = j.title;
      this.chapterId = j.chapterId;
      
    }
  }
}
