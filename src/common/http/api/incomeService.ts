import queryString from 'query-string';
import { HttpClient } from "../httpClient";
import { IncomeFilter } from '../../models/filters/income.filter';
import { IncomeGroupedFilter } from '../../models/filters/income-grouped.filter';

export class IncomeService {
  private endpoint = "/incomes";
  private _httpClient!: HttpClient;

  constructor() {
    this._httpClient = new HttpClient();
  }

  public async getById(id: number) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}/${id}`
    );
    return response.data;
  }

  public async getAll(filter: IncomeFilter) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}?${queryString.stringify(filter)}`
    );
    return response.data;
  }

  public async getGroupedByDay(filter: IncomeGroupedFilter) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}/grouped-by-day?${queryString.stringify(filter)}`
    );
    return response.data;
  }
}

export default new IncomeService();
