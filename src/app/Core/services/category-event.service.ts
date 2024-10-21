import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';
import { EventCategoryResponse, EventCategoryRequest, EventCategorySearchRequest, EventCategoryUpdateRequest } from 'src/app/modules/category-event/category-event.module';

@Injectable({
  providedIn: 'root'
})
export class CategoryEventService {
  public SelectedData: EventCategoryResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }
  async Add(data: EventCategoryRequest) {
    const apiUrl = `/api/eventCategory`;

    return await this.httpClient.post(apiUrl, data);
  }

  async Update(data: EventCategoryUpdateRequest) {

    const apiUrl = `/api/eventCategory`;
    return await this.httpClient.put(apiUrl, data);
  }

  async Delete(uuid: string) {

    const apiUrl = `/api/eventCategory/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: EventCategorySearchRequest) {

    const apiUrl = `/api/eventCategory/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }


}
