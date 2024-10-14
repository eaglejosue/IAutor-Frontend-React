export class IncomeGroupedByDayModel {
  ownerId!: number;
  ownerProfileImgUrl!: string;
  ownerName!: string;
  ownerType!: string;
  dates!: string[];
  valueIsMoney!: boolean;
  valueAcomulated!: boolean;
  values!: number[];
  qtdValues!: number[];
  total!: number;
  qtdTotal!: number;

  constructor(j?: any) {
    if (j) {
      this.ownerId = j.ownerId;
      this.ownerProfileImgUrl = j.ownerProfileImgUrl;
      this.ownerName = j.ownerName;
      this.ownerType = j.ownerType;
      this.dates = j.dates;
      this.valueIsMoney = j.valueIsMoney;
      this.valueAcomulated = j.valueAcomulated;
      this.values = j.values;
      this.qtdValues = j.qtdValues;
      this.total = j.total;
      this.qtdTotal = j.qtdTotal;
    }
  }
}