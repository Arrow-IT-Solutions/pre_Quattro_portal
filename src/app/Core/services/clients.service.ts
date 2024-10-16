import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { UserService } from './user.service';

import Axios from 'axios';
import { UserResponse } from 'src/app/modules/auth/auth.module';

import { environment } from 'src/environments/environment';
import { HttpClientService } from './http-client.service';
import { ClientSearchRequest } from 'src/app/modules/clients/clients.module';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  public SelectedData: ClientsService | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

  
}
