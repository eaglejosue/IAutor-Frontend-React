import { BaseModel } from "./base.model";
import { ChapterModel } from "./chapter.model";

export class PlanModel extends BaseModel {
  title!: string;
  price!: number;
  currency!: string;
  maxQtdCallIASugestions!: number;
  initialValidityPeriod!: Date;
  finalValidityPeriod!: Date;
  caractersLimitFactor!: number;

  //used on Plan Crud
  chapterQuestions?: [ChapterIdQuestionId]

  //used on front
  chapters?: [ChapterModel];

  planChapters?:[any]

  constructor(j?: any) {
    super(j);
    if (j) {
      this.title = j.title;
      this.price = j.price;
      this.currency = j.currency;
      this.maxQtdCallIASugestions = j.maxQtdCallIASugestions;
      this.initialValidityPeriod = j.initialValidityPeriod;
      this.finalValidityPeriod = j.finalValidityPeriod;
      this.caractersLimitFactor = j.caractersLimitFactor;
      this.chapterQuestions = j.chapterPlanQuestion;
      this.planChapters = j.planChapters;
    }
  }
}

export interface ChapterIdQuestionId {
  chapterId: number | undefined;
  questionId: number;
}
