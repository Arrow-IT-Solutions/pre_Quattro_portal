import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { RequestBase, ResponseBase, SearchRequestBase } from 'src/app/shared/class/class';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';
import { ReactiveFormsModule } from '@angular/forms';






 


@NgModule({
  declarations: [
    EmployeesComponent,
    AddEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
    NgPrimeModule,
    ReactiveFormsModule
  ]
})
export class EmployeesModule { }
export interface EmployeeTranslationRequest {

}
export interface EmployeesResponse extends ResponseBase  {
  
 }
 export interface EmployeesSearchRequest extends SearchRequestBase{
 

 }
 export interface EmployeeResponse extends ResponseBase  {
 

  
 }
 export interface EmployeeUpdateRequest extends RequestBase {


 }
 export interface EmployeeRequest extends RequestBase {
  

 }
