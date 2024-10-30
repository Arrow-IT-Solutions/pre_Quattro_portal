import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { TransferResponse } from 'src/app/modules/transfer/transfer.module';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  public SelectedData:TransferResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

 
}
