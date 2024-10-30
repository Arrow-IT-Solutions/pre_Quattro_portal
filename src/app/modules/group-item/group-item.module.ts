import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupItemRoutingModule } from './group-item-routing.module';
import { GroupItemComponent } from './group-item/group-item.component';
import { AddGroupItemComponent } from './add-group-item/add-group-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponseBase } from 'src/app/shared/class/class';


@NgModule({
  declarations: [
    GroupItemComponent,
    AddGroupItemComponent
  ],
  imports: [
    CommonModule,
    GroupItemRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class GroupItemModule { }
export interface GroupItemResponse extends ResponseBase {



}

