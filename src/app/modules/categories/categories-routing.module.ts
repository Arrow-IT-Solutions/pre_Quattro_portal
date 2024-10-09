import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './add-category/add-category/add-category.component';
import { DefinitionsComponent } from './add-category/definitions/definitions.component';
import { VariantsComponent } from './add-category/variants/variants.component';

const routes: Routes = [
  {
    path:'',
    component:CategoriesComponent
  },
  {
    path:'add-category',
    component:AddCategoryComponent,
    children: [
      {
        path: 'definitions',
        component:DefinitionsComponent,
      },
      {
        path: 'variants',
        component:VariantsComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
