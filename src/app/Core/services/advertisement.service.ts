import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  
    public SelectedData: AdvertisementService | null = null;
    public Dialog: any | null = null;
    constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }
  
    
  

  
}
