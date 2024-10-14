import queryString from 'query-string';
import { HttpClient } from "../httpClient";
import { ParamModel } from '../../models/param.model';
import { ParamFilter } from '../../models/filters/param.filter';

export class ParamService {
  private endpoint = "/params";
  private _httpClient!: HttpClient;

  constructor() {
    this._httpClient = new HttpClient();
  }

  public async getByKey(key: string) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}/${key}`
    );
    return response.data;
  }

  public async getAll(filter: ParamFilter) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}?${queryString.stringify(filter)}`
    );
    return response.data;
  }

  public async post(data: ParamModel) {
    const response = await this._httpClient.post<string>(
      this.endpoint, { data }
    );
    return response.data;
  }

  public async put(data: ParamModel) {
    const response = await this._httpClient.put<string>(
      this.endpoint, { data }
    );
    return response.data;
  }

  public async patch(data: ParamModel) {
    const response = await this._httpClient.patch<string>(
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
}

export default new ParamService();
