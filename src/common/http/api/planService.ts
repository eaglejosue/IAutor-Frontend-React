import queryString from 'query-string';
import { HttpClient } from "../httpClient";
import { PlanModel } from '../../models/plan.model';
import { PlanFilter } from '../../models/filters/plan.filter';

export class PlanService {
  private endpoint = "/plans";
  private _httpClient!: HttpClient;

  constructor() {
    this._httpClient = new HttpClient();
  }

  public async getById(id: number) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}/${id}`,
    );
    return response.data;
  }

  public async getAll(filter: PlanFilter) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}?${queryString.stringify(filter)}`
    );
    return response.data;
  }

  public async post(data: PlanModel) {
    const response = await this._httpClient.post<string>(this.endpoint, {
      data,
    });
    return response.data;
  }

  public async put(data: PlanModel) {
    const response = await this._httpClient.put<string>(
      this.endpoint, { data }
    );
    return response.data;
  }

  public async delete(id: number) {
    const response = await this._httpClient.delete<string>(
      `${this.endpoint}/${id}`
    );
    return response.data;
  }

  public async getPlanChaptersByPlanId(id: number) {
    const response = await this._httpClient.get<string>(
      `/planchapter/${id}`,
    );
    return response.data;
  }
}