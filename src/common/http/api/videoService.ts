import queryString from 'query-string';
import { HttpClient } from "../httpClient";
import { VideoModel } from "../../models/video.model";
import { VideoFilter } from "../../models/filters/video.filter";
import { VideoTrailerModel } from '../../models/videoTrailer.model';

export class VideoService {
  private endpoint = "/videos";
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

  public async getAll(filter: VideoFilter) {
    const response = await this._httpClient.get<string>(
      `${this.endpoint}?${queryString.stringify(filter)}`
    );
    return response.data;
  }

  public async post(data: VideoModel) {
    const response = await this._httpClient.post<string>(
      this.endpoint, { data }
    );
    return response.data;
  }

  public async put(data: VideoModel) {
    const response = await this._httpClient.put<string>(
      this.endpoint, { data }
    );
    return response.data;
  }

  public async patch(data: VideoModel) {
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

  public async postVideoTrailer(data: VideoTrailerModel) {
    const response = await this._httpClient.post<string>(
      `${this.endpoint}/trailers`, { data }
    );
    return response.data;
  }

  public async deleteVideoTrailer(id: number) {
    const response = await this._httpClient.delete<string>(
      `${this.endpoint}/trailers/${id}`
    );
    return response.data;
  }
}

export default new VideoService();
