import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';
import { GroupItemResponse } from 'src/app/modules/group-item/group-item.module';

@Injectable({
  providedIn: 'root'
})
export class GroupItemService {
  public SelectedData: GroupItemResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

  
}
