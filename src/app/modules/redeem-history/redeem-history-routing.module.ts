import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedeemHistoryComponent } from './redeem-history/redeem-history.component';

const routes: Routes = [
  {
    path:'',
    component:RedeemHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedeemHistoryRoutingModule { }
