import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponseBase, SearchRequestBase, RequestBase } from 'src/app/shared/class/class';
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

export interface CategoryResponse extends ResponseBase {
  uuid?: string,
  type: string,
  typeValue: string,
  coverImage: string,
  categoryTranslation?: { [key: string]: CategoryTranslationResponse };
  categoryImage: CategoryImageResponse[]

}
export interface CategorySearchRequest extends SearchRequestBase {
  uuid?: string,
  type?: string,
  includeImages?: string,
}
export interface CategoryTranslationResponse {
  uuid: string,
  description: string,
  language: string,
}

export interface CategoryImageRequest extends RequestBase {
  image: string,
}

export interface CategoryImageResponse extends ResponseBase {
  uuid?: string
  image: string,
}

export interface CategoryRequest extends RequestBase {
  categoryTranslation?: CategoryTranslationRequest[];
  coverImage: string,
  type: string,
  categoryImages?: CategoryImageRequest[];
}

export interface CategoryUpdateRequest extends RequestBase {
  categoryTranslation?: CategoryTranslationUpdateRequest[];
  coverImage: string,
  type: string,
  categoryImages?: CategoryImageRequest[];
}

export interface CategoryTranslationRequest {
  uuid?: string;
  description?: string;
  language?: string;
}

export interface CategoryTranslationUpdateRequest {
  description?: string;
  language: string

}
