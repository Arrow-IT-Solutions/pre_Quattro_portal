import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EarnedRoutingModule } from './earned-routing.module';
import { EarnedComponent } from './earned/earned.component';
import { AddEarnedComponent } from './add-earned/add-earned.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponseBase } from 'src/app/shared/class/class';


@NgModule({
  declarations: [
    EarnedComponent,
    AddEarnedComponent
  ],
  imports: [
    CommonModule,
    EarnedRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EarnedModule { }
export interface EarnedResponse extends ResponseBase {
}
