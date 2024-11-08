import { BaseModel } from "../base.model";

export class PlanFilter extends BaseModel {
  title?: string;

  constructor(j?: any) {
    super(j);
    if (j) {
      this.title = j.title;
    }
  }
}
