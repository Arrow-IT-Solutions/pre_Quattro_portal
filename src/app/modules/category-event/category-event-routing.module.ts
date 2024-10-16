import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryEventComponent } from './category-event/category-event.component';

const routes: Routes = [
  {
    path:"",
    component:CategoryEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryEventRoutingModule { }
