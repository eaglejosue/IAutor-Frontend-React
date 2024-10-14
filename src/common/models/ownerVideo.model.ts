//import { OwnerModel } from "./owner.model";

export class OwnerVideoModel {
  id!: number;
  createdAt?: string;
  ownerId?: number;
  videoId?: number;
  percentageSplit?: number;
  //owner?: OwnerModel;

  constructor(j?: any) {
    if (j) {
      this.id = j.id;
      this.createdAt = j.createdAt;
      this.ownerId = j.ownerId;
      this.videoId = j.videoId;
      this.percentageSplit = j.percentageSplit;
      //this.owner = j.owner;
    }
  }
}
