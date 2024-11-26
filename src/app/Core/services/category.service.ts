import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';
import { CategoryRequest, CategoryResponse, CategorySearchRequest, CategoryUpdateRequest } from 'src/app/modules/categories/categories.module';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public SelectedData: CategoryResponse | null = null;
  public CategoryData

  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }
  async Add(data: CategoryRequest) {
    const apiUrl = `/api/category`;

    return await this.httpClient.post(apiUrl, data);
  }

  async Update(data: CategoryUpdateRequest) {

    const apiUrl = `/api/category`;
    return await this.httpClient.put(apiUrl, data);
  }

  async Delete(uuid: string) {

    const apiUrl = `/api/category/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: CategorySearchRequest) {

    const apiUrl = `/api/category/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }
}
