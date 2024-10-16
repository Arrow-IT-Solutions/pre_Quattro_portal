import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgPrimeModule,
    SharedModule
  ]
})
export class DashboardModule { }
