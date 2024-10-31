import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer/transfer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponseBase, SearchRequestBase } from 'src/app/shared/class/class';
import { ClientsResponse } from '../clients/clients.module';


@NgModule({
  declarations: [
    TransferComponent
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TransferModule { }
export interface TransferResponse extends ResponseBase {
  uuid?: string
  clientIDFK: string,
  quattro: string,
  client: ClientsResponse,
  transactionIDFK,
  date: string,
  type: string,
  typeValue: string

}

export interface TransferSearchRequest extends SearchRequestBase {
  uuid?: string;
  clientName?: string;
  includeClients: string,
}
