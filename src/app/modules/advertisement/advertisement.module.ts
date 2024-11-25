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

export interface AdResponse extends ResponseBase {

  uuid?: string;
  adTranslation?: { [key: string]: AdTranslationResponse };
  quattro: string;
  startDate: string;
  endDate: string;
  image: string

}
export interface AdvertiseSearchRequest extends SearchRequestBase {
  uuid?: string;
  name: string;
  startDate: string;
  endDate: string

}
export interface AdUpdateRequest extends RequestBase {
  adTranslation?: AdTranslationRequest[];
  quattro?: string,
  startDate?: string,
  endDate?: string,
  image?: string,
}

export interface AdRequest extends RequestBase {
  adTranslation?: AdTranslationRequest[];
  quattro?: string,
  startDate?: string,
  endDate?: string,
  image?: string,
}

export interface AdTranslationResponse {
  uuid?: string;
  name?: string;
  description?: string;
  language?: string;
}
export interface AdTranslationRequest {
  uuid?: string;
  name?: string;
  description?: string;

  language?: string;
}
export interface AdTranslationUpdateRequest {
  uuid?: string;
  name?: string;
  description?: string;

}

