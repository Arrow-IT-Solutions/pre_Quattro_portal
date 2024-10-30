import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';
import { RedeemResponse } from 'src/app/modules/redeem-history/redeem-history.module';

@Injectable({
  providedIn: 'root'
})
export class RedeemHistoryService {
  public SelectedData:RedeemResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

  
}
