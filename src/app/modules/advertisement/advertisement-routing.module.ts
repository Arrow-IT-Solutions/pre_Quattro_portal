import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementsComponent } from './advertisements/advertisements.component';

const routes: Routes = [
  {
    path:'',
    component:AdvertisementsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertisementRoutingModule { }
