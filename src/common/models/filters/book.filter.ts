import { BaseModel } from "../base.model";

export class BookFilter extends BaseModel {
  filter?: string;
  releaseDate?: string;
  cloudinaryPublicId? : string;
  price?: string;
  expirationDate?: string;
  promotionPrice?: string;
  promotionExpirationDate?: string;
  ownerId?: number;
  includeOwnerVideos?: boolean;
  trailerId?: number;
  includeTrailers?: boolean;
  paymentsApproved?: boolean;
  includePayments?: boolean;
  includeUserVideoLogs?: boolean;
  includeUserBookPlan?:boolean;
  listToCrud?: boolean;
  listToWatch?: boolean;
  userId?:number;

  constructor(j?: any) {
    super(j);
    if (j) {
      this.filter = j.filter;
      this.releaseDate = j.releaseDate;
      this.cloudinaryPublicId = j.cloudinaryPublicId;
      this.price = j.price;
      this.expirationDate = j.expirationDate;
      this.promotionPrice = j.promotionPrice;
      this.promotionExpirationDate = j.promotionExpirationDate;
      this.ownerId = j.ownerId;
      this.includeOwnerVideos = j.includeOwnerVideos;
      this.trailerId = j.trailerId;
      this.includeTrailers = j.includeTrailers;
      this.paymentsApproved = j.paymentsApproved;
      this.includePayments = j.includePayments;
      this.includeUserVideoLogs = j.includeUserVideoLogs;
      this.listToCrud = j.listToCrud;
      this.listToWatch = j.listToWatch;
      this.userId = j.userId;
    }
  }
}
