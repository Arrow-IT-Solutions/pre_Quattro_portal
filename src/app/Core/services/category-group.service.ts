import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';
import { CategoryGroupResponse } from 'src/app/modules/category-group/category-group.module';

@Injectable({
  providedIn: 'root'
})
export class CategoryGroupService {
  public SelectedData: CategoryGroupResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

 
}
