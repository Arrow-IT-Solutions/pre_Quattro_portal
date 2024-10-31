import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';
import { GroupItemResponse, GroupItemRequest, GroupItemSearchRequest, GroupItemUpdateRequest } from 'src/app/modules/group-item/group-item.module';

@Injectable({
  providedIn: 'root'
})
export class GroupItemService {
  public SelectedData: GroupItemResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }
  async Add(data: GroupItemRequest) {
    const apiUrl = `/api/groupItem`;

    return await this.httpClient.post(apiUrl, data);
  }

  async Update(data: GroupItemUpdateRequest) {

    const apiUrl = `/api/groupItem`;
    return await this.httpClient.put(apiUrl, data);
  }

  async Delete(uuid: string) {

    const apiUrl = `/api/groupItem/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: GroupItemSearchRequest) {

    const apiUrl = `/api/groupItem/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }

}
