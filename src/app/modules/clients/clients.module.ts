import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestBase, ResponseBase, SearchRequestBase } from 'src/app/shared/class/class';
import { AddClientComponent } from './add-client/add-client.component';


@NgModule({
  declarations: [
    ClientsComponent,
    AddClientComponent,
  
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    NgPrimeModule,
    ReactiveFormsModule,
    SharedModule
    
  ]
})
export class ClientsModule {}
  export interface ClientsResponse extends ResponseBase  {
    
   }
   export interface ClientTranslationRequest {
   
  }
   export interface ClientSearchRequest extends SearchRequestBase{
    
   }

   export interface ClientUpdateRequest extends RequestBase {
    

   }
   export interface ClientRequest extends RequestBase {
   

   }
 
