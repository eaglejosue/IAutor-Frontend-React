import { BaseModel } from "./base.model";
import { OrderModel } from "./order.model";
import { VideoTrailerModel } from "./videoTrailer.model";
import { UserVideoLogModel } from "./userVideoLog.model";
import { OwnerVideoModel } from "./ownerVideo.model";

export class VideoModel extends BaseModel {
  title!: string;
  description!: string;
  duration!: string;
  releaseDate!: string;
  price!: number;
  cloudinaryPublicId!: string;
  thumbImgUrl!: string;
  saleExpirationDate?: string;
  watchExpirationDate?: string;
  promotionPrice?: string;
  promotionExpirationDate?: string;
  updatedBy?: string;

  videoTrailers!: VideoTrailerModel[];
  ownerVideos!: OwnerVideoModel[];
  orders?: OrderModel[];
  userVideoLogs?: UserVideoLogModel[];

  isWatched!: boolean;
  userCanWatch!: boolean;
  paidDateTime?: string;

  constructor(j?: any) {
    super(j);
    if (j) {
      if (j.title) this.title = j.title;
      if (j.description) this.description = j.description;
      if (j.duration) this.duration = j.duration;
      if (j.releaseDate) this.releaseDate = j.releaseDate;
      if (j.price) this.price = j.price;
      if (j.cloudinaryPublicId) this.cloudinaryPublicId = j.cloudinaryPublicId;
      if (j.thumbImgUrl) this.thumbImgUrl = j.thumbImgUrl;
      if (j.saleExpirationDate) this.saleExpirationDate = j.saleExpirationDate;
      if (j.watchExpirationDate) this.watchExpirationDate = j.watchExpirationDate;
      if (j.promotionPrice) this.promotionPrice = j.promotionPrice;
      if (j.promotionExpirationDate) this.promotionExpirationDate = j.promotionExpirationDate;
      if (j.videoTrailers) this.videoTrailers = j.videoTrailers;
      if (j.ownerVideos) this.ownerVideos = j.ownerVideos;
      if (j.orders) this.orders = j.orders;
      if (j.userVideoLogs) this.userVideoLogs = j.userVideoLogs;
      if (j.updatedBy) this.updatedBy = j.updatedBy;

      this.isWatched = j.isWatched;
      this.userCanWatch = j.userCanWatch;
      this.paidDateTime = j.paidDateTime;
    }
  }
}
