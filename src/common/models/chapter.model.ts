import { BaseModel } from "./base.model";

export class ChapterModel extends BaseModel {
    title!: string;
    chapterNumber!: string;

  
    constructor(j?: any) {
      super(j);
      if (j) {
        this.title = j.title;
        this.chapterNumber = j.chapterNumber;
      }
    }
  }
  