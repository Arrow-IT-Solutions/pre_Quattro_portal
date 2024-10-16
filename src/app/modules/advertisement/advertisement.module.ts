import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { AdvertisementsComponent } from './advertisements/advertisements.component';
import { AddAdvertisementComponent } from './add-advertisement/add-advertisement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestBase, ResponseBase, SearchRequestBase } from 'src/app/shared/class/class';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AdvertisementsComponent,
    AddAdvertisementComponent
  ],
  imports: [
    CommonModule,
    AdvertisementRoutingModule,
    ReactiveFormsModule,
    NgPrimeModule,
    SharedModule
  ]
})
export class AdvertisementModule { }

export interface AdResponse extends ResponseBase  {
 

  
 }
 export interface AdvertiseSearchRequest extends SearchRequestBase{
  
 }
 export interface AdvertiseResponse extends ResponseBase  {
  

  
 }
 export interface AdTranslationRequest {

}
 export interface AdUpdateRequest extends RequestBase {
  
 }

 export interface AdRequest extends RequestBase {
  
 }

