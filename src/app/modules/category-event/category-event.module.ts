import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryEventRoutingModule } from './category-event-routing.module';
import { CategoryEventComponent } from './category-event/category-event.component';
import { AddCategoryEventComponent } from './add-category-event/add-category-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponseBase } from 'src/app/shared/class/class';



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
export interface eventResponse extends ResponseBase  { 
}
export interface EventResponse extends ResponseBase  {}
