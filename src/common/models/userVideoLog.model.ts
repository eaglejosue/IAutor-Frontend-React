export class UserVideoLogModel {
  id!: number;
  createdAt?: string;
  userId?: number;
  videoId?: number;
  log?: string;

  constructor(j?: any) {
    if (j) {
      this.id = j.id;
      this.createdAt = j.createdAt;
      this.userId = j.userId;
      this.videoId = j.videoId;
      this.log = j.log;
    }
  }
}
