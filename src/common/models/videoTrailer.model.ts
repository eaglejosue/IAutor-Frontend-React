export class VideoTrailerModel {
  id!: number;
  isActive!: boolean;
  createdAt?: string;
  deletedAt?: string;
  title!: string;
  videoId!: number;
  cloudinaryPublicId!: string;

  constructor(j?: any) {
    if (j) {
      if (j.id) this.id = j.id;
      if (j.isActive) this.isActive = j.isActive;
      if (j.createdAt) this.createdAt = j.createdAt;
      if (j.deletedAt) this.deletedAt = j.deletedAt;
      if (j.title) this.title = j.title;
      if (j.videoId) this.videoId = j.videoId;
      if (j.cloudinaryPublicId) this.cloudinaryPublicId = j.cloudinaryPublicId;
    }
  }
}
