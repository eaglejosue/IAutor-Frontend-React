import queryString from 'query-string';
import { HttpClient } from "../httpClient";
import { OwnerModel } from '../../models/owner.model';
import { OwnerFilter } from '../../models/filters/owner.filter';
import { OwnerVideoModel } from '../../models/ownerVideo.model';

export class OwnerService {
  private endpoint = "/owners";
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

  public async getAll(filter: OwnerFilter) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}?${queryString.stringify(filter)}`
    );
    return response.data;
  }

  public async post(data: OwnerModel) {
    const response = await this._httpClient.post<string>(
      this.endpoint, { data }
    );
    return response.data;
  }

  public async put(data: OwnerModel) {
    const response = await this._httpClient.put<string>(
      this.endpoint, { data }
    );
    return response.data;
  }

  public async patch(data: OwnerModel) {
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

  public async postOwnerVideo(data: OwnerVideoModel) {
    const response = await this._httpClient.post<string>(
      `${this.endpoint}/videos`, { data }
    );
    return response.data;
  }

  public async deleteOwnerVideo(id: number) {
    const response = await this._httpClient.delete<string>(
      `${this.endpoint}/videos/${id}`
    );
    return response.data;
  }

  public async verifyIuguAccount(id: number) {
    const response = await this._httpClient.post<string>(
      `${this.endpoint}/iugu-sub-account-verification/${id}`
    );
    return response.data;
  }
}

export default new OwnerService();
