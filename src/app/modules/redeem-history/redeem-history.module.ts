import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedeemHistoryRoutingModule } from './redeem-history-routing.module';
import { RedeemHistoryComponent } from './redeem-history/redeem-history.component';
import { RequestBase, ResponseBase, SearchRequestBase } from 'src/app/shared/class/class';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientsResponse } from '../clients/clients.module';
import { RewardResponse } from '../rewards/rewards.module';


@NgModule({
  declarations: [
    RedeemHistoryComponent
  ],
  imports: [
    CommonModule,
    RedeemHistoryRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RedeemHistoryModule { }
export interface RewardHistoryResponse extends ResponseBase {
  uuid?: string,
  clientIDFK: string,
  rewardIDFK: string,
  rewardQuattro: string,
  client: ClientsResponse,
  reward: RewardResponse,
  transactionIDFK: string,
  date: string,
  status: string,
  statusValue: string

}

export interface RewardHistorySearchRequest extends SearchRequestBase {
  uuid?: string,
  clientIDFK?: string,
  rewardIDFK?: string,
  clientName?: string,
  rewardName?: string,
  status?: string,
  includeClients?: string,
  includeReward?: string
}
export interface RewardHistoryRecieved extends RequestBase {
  uuid?: string,
}

