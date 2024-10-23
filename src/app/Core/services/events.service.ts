import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';
import { EventRequest, EventSearchRequest, EventUpdateRequest, EventResponse } from 'src/app/modules/events/events.module';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public SelectedData: EventResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }
  async Add(data: EventRequest) {
    const apiUrl = `/api/event`;

    return await this.httpClient.post(apiUrl, data);
  }

  async Update(data: EventUpdateRequest) {

    const apiUrl = `/api/event`;
    return await this.httpClient.put(apiUrl, data);
  }

  async Delete(uuid: string) {

    const apiUrl = `/api/event/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: EventSearchRequest) {

    const apiUrl = `/api/event/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }


}
