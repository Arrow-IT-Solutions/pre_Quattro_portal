import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';
import { RewardHistoryResponse, RewardHistorySearchRequest, RewardHistoryRecieved } from 'src/app/modules/redeem-history/redeem-history.module';

@Injectable({
  providedIn: 'root'
})
export class RedeemHistoryService {
  public SelectedData: RewardHistoryResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

  async Delete(uuid: string) {

    const apiUrl = `/api/rewardHistory/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: RewardHistorySearchRequest) {

    const apiUrl = `/api/rewardHistory/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }

  async Recieved(data: RewardHistoryRecieved) {

    const apiUrl = `/api/rewardHistory/recieved`;
    return await this.httpClient.put(apiUrl, data);
  }


}
