import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryGroupRoutingModule } from './category-group-routing.module';
import { CategoryGroupComponent } from './category-group/category-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponseBase, RequestBase, SearchRequestBase } from 'src/app/shared/class/class';
import { AddCategoryGroupComponent } from './add-category-group/add-category-group.component';
import { CategoryResponse } from '../categories/categories.module';


@NgModule({
  declarations: [
    CategoryGroupComponent,
    AddCategoryGroupComponent
  ],
  imports: [
    CommonModule,
    CategoryGroupRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CategoryGroupModule { }
export interface CategoryGroupResponse extends ResponseBase {

  uuid?: string;
  categoryGroupTranslation?: { [key: string]: CategoryGroupTranslationResponse };
  image: string,
  categoryIDFK: string,
  category: CategoryResponse

}
export interface CategoryGroupSearchRequest extends SearchRequestBase {
  uuid?: string;
  name?: string;
  categoryIDFK?: string,
  includeCategory: string

}
export interface CategoryGroupUpdateRequest extends RequestBase {
  categoryGroupTranslation?: CategoryGroupTranslationRequest[];
  image: string,
  categoryIDFK: string,
}

export interface CategoryGroupRequest extends RequestBase {
  categoryGroupTranslation?: CategoryGroupTranslationRequest[];
  image: string,
  categoryIDFK: string,
}

export interface CategoryGroupTranslationResponse {
  uuid?: string;
  name?: string;
  language?: string;
}
export interface CategoryGroupTranslationRequest {
  uuid?: string;
  name?: string;
  language?: string;
}
export interface CategoryGroupTranslationUpdateRequest {
  uuid?: string;
  name?: string;
}
