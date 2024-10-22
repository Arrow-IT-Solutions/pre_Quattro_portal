import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';
import { RewardRequest, RewardResponse, RewardSearchRequest, RewardUpdateRequest } from 'src/app/modules/rewards/rewards.module';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  public SelectedData: RewardResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }
  async Add(data: RewardRequest) {
    const apiUrl = `/api/reward`;

    return await this.httpClient.post(apiUrl, data);
  }

  async Update(data: RewardUpdateRequest) {

    const apiUrl = `/api/reward`;
    return await this.httpClient.put(apiUrl, data);
  }

  async Delete(uuid: string) {

    const apiUrl = `/api/reward/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: RewardSearchRequest) {

    const apiUrl = `/api/reward/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }


}
