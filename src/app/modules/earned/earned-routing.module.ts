import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarnedComponent } from './earned/earned.component';

const routes: Routes = [
  {
    path:'',
    component:EarnedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EarnedRoutingModule { }
