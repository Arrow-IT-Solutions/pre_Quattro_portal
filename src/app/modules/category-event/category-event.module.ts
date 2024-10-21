import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryEventRoutingModule } from './category-event-routing.module';
import { CategoryEventComponent } from './category-event/category-event.component';
import { AddCategoryEventComponent } from './add-category-event/add-category-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponseBase, RequestBase, SearchRequestBase } from 'src/app/shared/class/class';



@NgModule({
  declarations: [
    CategoryEventComponent,
    AddCategoryEventComponent
  ],
  imports: [
    CommonModule,
    CategoryEventRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CategoryEventModule { }
export interface eventResponse extends ResponseBase {
}
export interface EventResponse extends ResponseBase {

}

export interface EventCategoryResponse extends ResponseBase {

  uuid?: string;
  eventCategoryTranslation?: { [key: string]: EventCategoryTranslationResponse };

}
export interface EventCategorySearchRequest extends SearchRequestBase {
  uuid?: string;
  name: string;

}
export interface EventCategoryUpdateRequest extends RequestBase {
  eventCategoryTranslation?: EventCategoryTranslationRequest[];
}

export interface EventCategoryRequest extends RequestBase {
  eventCategoryTranslation?: EventCategoryTranslationRequest[];
}

export interface EventCategoryTranslationResponse {
  uuid?: string;
  name?: string;
  language?: string;
}
export interface EventCategoryTranslationRequest {
  uuid?: string;
  name?: string;
  language?: string;
}
export interface EventCategoryTranslationUpdateRequest {
  uuid?: string;
  name?: string;
}
