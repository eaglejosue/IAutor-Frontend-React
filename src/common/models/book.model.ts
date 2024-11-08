import { BaseModel } from "./base.model";
import { OrderModel } from "./order.model";
import { UserBookLogModel } from "./user-book-log.model";

export class BookModel extends BaseModel {
  title!: string;
  description!: string;
  releaseDate!: string;
  price!: number;
  publicId!: string;
  thumbImgUrl!: string;
  saleExpirationDate?: string;
  downloadExpirationDate?: string;
  promotionPrice?: string;
  promotionExpirationDate?: string;

  orders?: OrderModel[];
  userBookLogs?: UserBookLogModel[];

  paidDateTime?: string;

  constructor(j?: any) {
    super(j);
    if (j) {
      if (j.title) this.title = j.title;
      if (j.description) this.description = j.description;
      if (j.releaseDate) this.releaseDate = j.releaseDate;
      if (j.price) this.price = j.price;
      if (j.publicId) this.publicId = j.publicId;
      if (j.thumbImgUrl) this.thumbImgUrl = j.thumbImgUrl;
      if (j.saleExpirationDate) this.saleExpirationDate = j.saleExpirationDate;
      if (j.downloadExpirationDate) this.downloadExpirationDate = j.downloadExpirationDate;
      if (j.promotionPrice) this.promotionPrice = j.promotionPrice;
      if (j.promotionExpirationDate) this.promotionExpirationDate = j.promotionExpirationDate;
      if (j.orders) this.orders = j.orders;
      if (j.userBookLogs) this.userBookLogs = j.userBookLogs;

      this.paidDateTime = j.paidDateTime;
    }
  }
}
