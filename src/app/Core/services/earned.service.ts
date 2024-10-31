import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';
import { EarnedResponse, EarnedRequest, EarnedSearchRequest, EarnedUpdateRequest } from 'src/app/modules/earned/earned.module';

@Injectable({
  providedIn: 'root'
})
export class EarnedService {
  public SelectedData: EarnedResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }
  async Add(data: EarnedRequest) {
    const apiUrl = `/api/earned`;

    return await this.httpClient.post(apiUrl, data);
  }

  async Update(data: EarnedUpdateRequest) {

    const apiUrl = `/api/earned`;
    return await this.httpClient.put(apiUrl, data);
  }

  async Delete(uuid: string) {

    const apiUrl = `/api/earned/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: EarnedSearchRequest) {

    const apiUrl = `/api/earned/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }


}
