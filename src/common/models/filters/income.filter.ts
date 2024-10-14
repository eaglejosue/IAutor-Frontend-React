export class IncomeFilter {
  id!: number;
  createdAt?: string;
  updatedAt?: string;
  ownerId?: number;
  includeOwner?: boolean;
  dateReference?: string;
  sumValue?: string;
  orderBy?: string;

  constructor(j?: any) {
    if (j) {
      this.id = j.id;
      this.createdAt = j.createdAt;
      this.updatedAt = j.updatedAt;
      this.ownerId = j.ownerId;
      this.includeOwner = j.includeOwner;
      this.dateReference = j.dateReference;
      this.sumValue = j.sumValue;
      this.orderBy = j.orderBy;
    }
  }
}
