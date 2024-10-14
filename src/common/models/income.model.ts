export class IncomeModel{
  id!: number;
  createdAt?: string;
  updatedAt?: string;
  ownerId!: number;
  dateReference?: string;
  sumValue?: string;

  constructor(j?: any) {
    if (j) {
      this.id = j.id;
      this.createdAt = j.createdAt;
      this.updatedAt = j.updatedAt;
      this.ownerId = j.ownerId;
      this.dateReference = j.dateReference;
      this.sumValue = j.sumValue;
    }
  }
}
