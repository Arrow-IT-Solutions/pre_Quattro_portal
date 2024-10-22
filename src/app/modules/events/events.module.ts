import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events/events.component';
import { AddEventComponent } from './add-event/add-event.component';
import { ResponseBase, RequestBase, SearchRequestBase } from 'src/app/shared/class/class';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientsResponse } from '../clients/clients.module';
import { EventCategoryResponse } from '../category-event/category-event.module';


@NgModule({
  declarations: [
    EventsComponent,
    AddEventComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EventsModule { }
export interface EventResponse extends ResponseBase {
  uuid?: string;
  eventCategoryIDFK: string;
  date: string;
  clientIDFK: string;
  noofPerson: string
  phone: string
  countryCode: string,
  client: ClientsResponse,
  eventCategory: EventCategoryResponse
}
export interface EventSearchRequest extends SearchRequestBase {
  uuid?: string;
  name: string;
  eventCategoryIDFK: string;
  phone: string
  includeCtegory: string
  includeClient: string
}
export interface EventUpdateRequest extends RequestBase {
  uuid?: string;
  eventCategoryIDFK: string;
  date: string;
  clientIDFK: string;
  noOfOPerson: string
  phone: string
  countryCode: string
}

export interface EventRequest extends RequestBase {
  eventCategoryIDFK: string;
  date: string;
  clientIDFK: string;
  noOfOPerson: string
  phone: string
  countryCode: string
}
