import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsComponent } from './rewards/rewards.component';
import { AddRewardComponent } from './add-reward/add-reward.component';
import { ResponseBase } from 'src/app/shared/class/class';
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
export interface RewardsResponse extends ResponseBase  {
    
}
