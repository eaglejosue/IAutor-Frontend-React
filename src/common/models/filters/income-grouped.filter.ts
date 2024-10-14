export class IncomeGroupedFilter {
  ownerId?: number;
  filter?: string;
  qtdDays?: number;

  constructor(j?: any) {
    if (j) {
      this.ownerId = j.ownerId;
      this.filter = j.filter;
      this.qtdDays = j.qtdDays;
    }
  }
}
