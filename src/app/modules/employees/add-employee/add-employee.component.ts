import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { EmployeesService } from 'src/app/Core/services/employees.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { EmployeeRequest, EmployeeUpdateRequest } from '../employees.module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  providers:[MessageService]
})
export class AddEmployeeComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  contryCode: string[]=["+962","+963"];
  selectedCode: string | null = null;
  gender:any[] = [
    { nameAr: 'ذكر', nameEn: 'Male', value: 0 },
    { nameAr: 'أنثى', nameEn: 'Female', value: 1 }
  ];
  selectedgender:string | null=null;

  constructor(public formBuilder:FormBuilder,public layoutService:LayoutService,public employeeService:EmployeesService){
    this.dataForm=formBuilder.group({
      clientNameAr:[''],
      clientNameEn:[''],
      contryCode:[''],
      clientPhone:[''],
      clientGender:[''],
      password:[''],
      birthDate:['']

    })
  }

  async ngOnInit() {
    try {
      this.loading = true;

      this.resetForm();

      if (this.employeeService.SelectedData != null) {
        await this.FillData();
      }
    } catch (exceptionVar) {
      console.log(exceptionVar);
    } finally {
      this.loading = false;
    }
  }

  get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
  }

  async onSubmit() {
    try {
      this.btnLoading = true;



      if (this.dataForm.invalid) {
        this.submitted = true;
        return;
      }
      await this.Save();
    } catch (exceptionVar) {
    } finally {
      this.btnLoading = false;
    }
  }


  async Save() {

    let response;
    let birthDate = new Date(this.dataForm.controls['birthDate'].value)


    var clientTranslation = [
      {
        clientName: this.dataForm.controls['clientNameAr'].value == null ? '' : this.dataForm.controls['clientNameAr'].value.toString(),
        language: 'ar'
      },
      {
        clientName: this.dataForm.controls['clientNameEn'].value == null ? '' : this.dataForm.controls['clientNameEn'].value.toString(),
        language: 'en'
      }
    ];
    if (this.employeeService.SelectedData != null) {
      // update

      var client: EmployeeUpdateRequest = {
       
      };

     
    } else {
      // add
      var client: EmployeeRequest = {
      
      };

      

    }

    

    this.btnLoading = false;
    this.submitted = false;
  }

  resetForm() {
    this.dataForm.reset();
  }

  async FillData() {

 
  }
  getGenderLable(): string {
    return this.layoutService.config.lang == 'ar' ? 'nameAr' : 'nameEn';
  }

}
