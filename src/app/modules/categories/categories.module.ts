import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponseBase, SearchRequestBase } from 'src/app/shared/class/class';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';
import { AddCategoryComponent } from './add-category/add-category/add-category.component';
import { DefinitionsComponent } from './add-category/definitions/definitions.component';
import { VariantsComponent } from './add-category/variants/variants.component';



@NgModule({
  declarations: [
    CategoriesComponent,
    AddCategoryComponent,
    DefinitionsComponent,
    VariantsComponent
    
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgPrimeModule
  ]
})
export class CategoriesModule { }

export interface CategoryTranslationRequest {

}

export interface CategoryResponse extends ResponseBase {

  
}
export interface CategorySearchRequest extends SearchRequestBase {
 
}
export interface CategoryTranslationResponse {

}
export interface EmployeeTranslationResponse {
  
}
