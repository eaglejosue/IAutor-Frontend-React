import { BaseModel } from "./base.model";

export class PlanModel extends BaseModel {
  title!: string;
  price!: number;
  currency!: string;
  maxLimitSendDataIA!: number;
  initialValidityPeriod!: Date;
  finalValidityPeriod!: Date;
  caractersLimitFactor!: number;

  chapterPlanQuestion?: [PlanChapterQuestions]

  constructor(j?: any) {
    super(j);
    if (j) {
      this.title = j.title;
      this.price = j.price;
      this.currency = j.currency;
      this.maxLimitSendDataIA = j.maxLimitSendDataIA;
      this.initialValidityPeriod = j.initialValidityPeriod;
      this.finalValidityPeriod = j.finalValidityPeriod;
      this.caractersLimitFactor = j.caractersLimitFactor;
      this.chapterPlanQuestion = j.chapterPlanQuestion;
    }
  }
}

export interface PlanChapterQuestions {
  chapterId: number | undefined;
  questionId: number;
}
