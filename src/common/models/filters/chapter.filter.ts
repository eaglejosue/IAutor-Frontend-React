import { BaseModel } from "../base.model";

export class ChapterFilter extends BaseModel {
  title?: string;
  
  constructor(j?: any) {
    super(j);
    if (j) {
      this.title = j.title;
      
    }
  }
}
