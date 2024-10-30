import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryGroupRoutingModule } from './category-group-routing.module';
import { CategoryGroupComponent } from './category-group/category-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponseBase } from 'src/app/shared/class/class';
import { AddCategoryGroupComponent } from './add-category-group/add-category-group.component';


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



}
