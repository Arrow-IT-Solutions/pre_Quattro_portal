import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedeemHistoryRoutingModule } from './redeem-history-routing.module';
import { RedeemHistoryComponent } from './redeem-history/redeem-history.component';
import { ResponseBase } from 'src/app/shared/class/class';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


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
export interface RedeemResponse extends ResponseBase {
}
