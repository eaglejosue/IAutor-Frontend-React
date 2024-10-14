import { BaseModel } from "../base.model";

export class OwnerFilter extends BaseModel {
  filter?: string;
  firstName?: string;
  lastName?: string;
  socialUserName?: string;
  socialMedia?: string;
  videoId?: number;
  includeUserInfo?: boolean
  iuguAccountVerified?: boolean
  getIdAndNameOnly?: boolean
  getMainOwner?: boolean

  constructor(j?: any) {
    super(j);
    if (j) {
      this.filter = j.filter;
      this.firstName = j.firstName;
      this.lastName = j.lastName;
      this.socialUserName = j.socialUserName;
      this.socialMedia = j.socialMedia;
      this.videoId = j.videoId;
      this.orderBy = j.orderBy;
      this.includeUserInfo = j.includeUserInfo;
      this.iuguAccountVerified = j.iuguAccountVerified;
      this.getIdAndNameOnly = j.getIdAndNameOnly;
      this.getMainOwner = j.getMainOwner;
    }
  }
}
