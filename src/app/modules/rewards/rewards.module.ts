import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsComponent } from './rewards/rewards.component';
import { AddRewardComponent } from './add-reward/add-reward.component';
import { ResponseBase, RequestBase, SearchRequestBase } from 'src/app/shared/class/class';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RewardsComponent,
    AddRewardComponent
  ],
  imports: [
    CommonModule,
    RewardsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RewardsModule { }
export interface RewardResponse extends ResponseBase {

  uuid?: string;
  rewardTranslation?: { [key: string]: RewardTranslationResponse };
  quattro: string;
  rewardType: string;
  rewardTypeValue: string
  image: string

}
export interface RewardSearchRequest extends SearchRequestBase {
  uuid?: string;
  name: string;
  rewardType: string;

}
export interface RewardUpdateRequest extends RequestBase {
  rewardTranslation?: RewardTranslationRequest[];
  quattro?: string,
  rewardType?: string,
  image?: string,
}

export interface RewardRequest extends RequestBase {
  rewardTranslation?: RewardTranslationRequest[];
  quattro?: string,
  rewardType?: string,
  image?: string,
}

export interface RewardTranslationResponse {
  uuid?: string;
  name?: string;
  language?: string;
}
export interface RewardTranslationRequest {
  uuid?: string;
  name?: string;
  language?: string;
}
export interface RewardTranslationUpdateRequest {
  uuid?: string;
  name?: string;
}
