import { BaseModel } from "../base.model";

export class OrderFilter extends BaseModel {
  userId?: number;
  includeUser?: boolean
  videoId?: number;
  includeVideo?: boolean
  paymentId?: number;
  includePayment?: boolean

  constructor(j?: any) {
    super(j);
    if (j) {
      this.userId = j.userId;
      this.includeUser = j.includeUser;
      this.videoId = j.videoId;
      this.includeVideo = j.includeVideo;
      this.paymentId = j.paymentId;
      this.includePayment = j.includePayment;
    }
  }
}
