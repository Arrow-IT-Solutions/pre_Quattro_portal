import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { RequestBase, ResponseBase, SearchRequestBase } from 'src/app/shared/class/class';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserResponse, UserTranslationRequest, UserTranslationUpdateRequest } from '../auth/auth.module';


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
export interface EmployeesResponse extends ResponseBase {
  uuid?: string
  user: UserResponse
  gender?: string,
  genderValue?: string,
  userIDFK: string,
  birthDate?: string,
  password?: string,
  image: string,
  phone?: string,
  email?: string
}
export interface EmployeeSearchRequest extends SearchRequestBase {
  uuid?: string
  name?: string
  phone?: string
  includeUser?: string

}

export interface EmployeeUpdateRequest extends RequestBase {
  uuid?: string
  employeeTranslation?: UserTranslationRequest[];
  deviceType?: string,
  gender?: string,
  birthDate?: string,
  profileImage?: string,
  phone?: string
  email?: string
  countryCode: string,
  image: string,


}
export interface EmployeeRequest extends RequestBase {

  employeeTranslation?: UserTranslationRequest[];
  phone?: string,
  gender?: string,
  birthDate?: string,
  password?: string,
  email?: string,
  image?: string,
  countryCode?: string,

}
