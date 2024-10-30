import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';
import { CategoryGroupResponse, CategoryGroupRequest, CategoryGroupSearchRequest, CategoryGroupUpdateRequest } from 'src/app/modules/category-group/category-group.module';

@Injectable({
  providedIn: 'root'
})
export class CategoryGroupService {
  public SelectedData: CategoryGroupResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }
  async Add(data: CategoryGroupRequest) {
    const apiUrl = `/api/categoryGroup`;

    return await this.httpClient.post(apiUrl, data);
  }

  async Update(data: CategoryGroupUpdateRequest) {

    const apiUrl = `/api/categoryGroup`;
    return await this.httpClient.put(apiUrl, data);
  }

  async Delete(uuid: string) {

    const apiUrl = `/api/categoryGroup/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: CategoryGroupSearchRequest) {

    const apiUrl = `/api/categoryGroup/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }


}
