import { BaseModel } from "./base.model";

export class PlanModel extends BaseModel {
    title!: string;
    price!:number;
    currency!:string;
    maxLimitSendDataIA!:number;
    initialValidityPeriod!:Date;
    finalValidityPeriod!:Date;
    caractersLimitFactor!:number;

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
      }
    }
  }

  export interface PlanModelChapterQuestions{
    id:number;
    title: string;
    price:number;
    currency:string;
    maxLimitSendDataIA:number;
    initialValidityPeriod:Date;
    finalValidityPeriod:Date;
    caractersLimitFactor:number;
    chapterPlanQuestion:[ChapterQuestions]
  }

  export interface ChapterQuestions{
    chapterId:number | undefined;
    questionId:number;
  }
  