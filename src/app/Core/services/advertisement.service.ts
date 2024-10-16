import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';
import { AdRequest, AdResponse, AdUpdateRequest, AdvertiseSearchRequest } from 'src/app/modules/advertisement/advertisement.module';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  public SelectedData: AdResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }
  async Add(data: AdRequest) {
    const apiUrl = `/api/ad`;

    return await this.httpClient.post(apiUrl, data);
  }

  async Update(data: AdUpdateRequest) {

    const apiUrl = `/api/ad`;
    return await this.httpClient.put(apiUrl, data);
  }

  async Delete(uuid: string) {

    const apiUrl = `/api/ad/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: AdvertiseSearchRequest) {

    const apiUrl = `/api/ad/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }




}
