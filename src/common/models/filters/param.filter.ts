import { BaseModel } from "../base.model";

export class ParamFilter extends BaseModel {
  key?: string;

  constructor(j?: any) {
    super(j);
    if (j) {
      this.key = j.key;
    }
  }
}
