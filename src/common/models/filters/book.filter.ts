import { BaseModel } from "../base.model";

export class BookFilter extends BaseModel {
  filter?: string;
  releaseDate?: string;
  cloudinaryPublicId? : string;
  price?: string;
  saleExpirationDate?: string;
  promotionPrice?: string;
  promotionExpirationDate?: string;
  paymentsApproved?: boolean;
  includePayments?: boolean;
  includeUserBookLogs?: boolean;
  includeUserBookPlan?:boolean;
  listToCrud?: boolean;
  listToDownload?: boolean;
  planId?: number;
  userId?:number;

  constructor(j?: any) {
    super(j);
    if (j) {
      this.filter = j.filter;
      this.releaseDate = j.releaseDate;
      this.cloudinaryPublicId = j.cloudinaryPublicId;
      this.price = j.price;
      this.saleExpirationDate = j.saleExpirationDate;
      this.promotionPrice = j.promotionPrice;
      this.promotionExpirationDate = j.promotionExpirationDate;
      this.paymentsApproved = j.paymentsApproved;
      this.includePayments = j.includePayments;
      this.includeUserBookLogs = j.includeUserBookLogs;
      this.includeUserBookPlan = j.includeUserBookPlan;
      this.listToCrud = j.listToCrud;
      this.listToDownload = j.listToDownload;
      this.planId = j.planId;
      this.userId = j.userId;
    }
  }
}
