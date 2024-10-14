import { BaseModel } from "./base.model";
import { PaymentModel } from "./payment.model";

export class OrderModel extends BaseModel {
  userId!: number;
  videoId!: number;
  iuguFaturaSecureUrl?: string;
  payments?: PaymentModel[];

  constructor(j?: any) {
    super(j);
    if (j) {
      this.userId = j.userId;
      this.videoId = j.videoId;
      this.iuguFaturaSecureUrl = j.iuguFaturaSecureUrl;
      this.payments = j.payments;
    }
  }
}
