import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarnedRoutingModule } from './earned-routing.module';
import { EarnedComponent } from './earned/earned.component';
import { AddEarnedComponent } from './add-earned/add-earned.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponseBase, RequestBase, SearchRequestBase } from 'src/app/shared/class/class';
import { ClientsResponse } from '../clients/clients.module';
import { EmployeesResponse } from '../employees/employees.module';


@NgModule({
  declarations: [
    EarnedComponent,
    AddEarnedComponent
  ],
  imports: [
    CommonModule,
    EarnedRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EarnedModule { }
export interface EarnedResponse extends ResponseBase {
  uuid?: string;
  clientIDFK: string,
  employeeIDFK: string,
  employee: EmployeesResponse,
  quattro: string,
  transactionIDFK: string,
  date: string,
  client: ClientsResponse
}
export interface EarnedSearchRequest extends SearchRequestBase {
  uuid?: string;
  clientName?: string;
  includeClient: string,
  includeEmployee: string

}
export interface EarnedUpdateRequest extends RequestBase {
  clientIDFK: string,
  employeeIDFK: string,
  quattro: string,
}

export interface EarnedRequest extends RequestBase {
  clientIDFK: string,
  employeeIDFK: string,
  quattro: string,
}


