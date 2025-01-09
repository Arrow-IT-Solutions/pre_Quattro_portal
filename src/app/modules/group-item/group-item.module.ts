import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupItemRoutingModule } from './group-item-routing.module';
import { GroupItemComponent } from './group-item/group-item.component';
import { AddGroupItemComponent } from './add-group-item/add-group-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponseBase, RequestBase, SearchRequestBase } from 'src/app/shared/class/class';
import { CategoryGroupResponse } from '../category-group/category-group.module';


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

  uuid?: string;
  groupItemTranslation?: { [key: string]: GroupItemTranslationResponse };
  image: string,
  coverImage: string,
  categoryGroupIDFK: string,
  price: string;
  categoryGroup: CategoryGroupResponse

}
export interface GroupItemSearchRequest extends SearchRequestBase {
  uuid?: string;
  name: string;
  categoryGroupIDFK: string,
  IncludeGroup: string

}
export interface GroupItemUpdateRequest extends RequestBase {
  groupItemTranslation?: GroupItemTranslationRequest[];
  image: string,
  coverImage: string,
  price: string;
  categoryGroupIDFK: string,
}

export interface GroupItemRequest extends RequestBase {
  groupItemTranslation?: GroupItemTranslationRequest[];
  image: string,
  coverImage: string,
  price: string;
  categoryGroupIDFK: string,
}

export interface GroupItemTranslationResponse {
  uuid?: string;
  name?: string;
  description?: string,
  language?: string;
}
export interface GroupItemTranslationRequest {
  uuid?: string;
  name?: string;
  description?: string,
  language?: string;
}
export interface GroupItemTranslationUpdateRequest {
  uuid?: string;
  name?: string;
  description?: string,
}

