import { HttpClient } from "../httpClient";

export class IAService {
  private endpoint = "/ia";
  private _httpClient!: HttpClient;

  constructor() {
    this._httpClient = new HttpClient();
  }

  public async post(data: any) {
    const response = await this._httpClient.post<string>(
      this.endpoint, { data }
    );
    return response.data;
  }
}

export default new IAService();
