import { BaseModel } from "./base.model";

export class ParamModel extends BaseModel {
  key?: string;
  value?: string;

  constructor(j?: any) {
    super(j);
    if (j) {
      this.key = j.key;
      this.value = j.value;
    }
  }
}
