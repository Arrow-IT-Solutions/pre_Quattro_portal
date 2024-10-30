import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';
import { EarnedResponse } from 'src/app/modules/earned/earned.module';

@Injectable({
  providedIn: 'root'
})
export class EarnedService {
  public SelectedData:EarnedResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

  
}
