import { BaseModel } from "./base.model";

export class PaymentModel extends BaseModel {
  orderId!: number;
  price?: string;
  status!: number;
  iuguPaidAt?: string;

  constructor(j?: any) {
    super(j);
    if (j) {
      this.orderId = j.orderId;
      this.price = j.price;
      this.status = j.status;
      this.iuguPaidAt = j.iuguPaidAt;
    }
  }
}
