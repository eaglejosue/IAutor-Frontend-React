export class BaseModel {
  id!: number;
  isActive!: boolean;
  createdAt!: string;
  updatedAt?: string;
  deletedAt?: string;

  orderBy?: string;

  constructor(j?: any) {
    if (j) {
      this.id = j.id;
      this.isActive = j.isActive;
      this.createdAt = j.createdAt;
      this.updatedAt = j.updatedAt;
      this.deletedAt = j.deletedAt;

      this.orderBy = j.orderBy;
    }
  }
}
