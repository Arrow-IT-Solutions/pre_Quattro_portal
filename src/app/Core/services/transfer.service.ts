import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { TransferResponse, TransferSearchRequest } from 'src/app/modules/transfer/transfer.module';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  public SelectedData: TransferResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

  async Delete(uuid: string) {

    const apiUrl = `/api/transfer/${uuid}`;
    return await this.httpClient.delete(apiUrl, uuid)

  }

  async Search(filter: TransferSearchRequest) {

    const apiUrl = `/api/transfer/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }


}
