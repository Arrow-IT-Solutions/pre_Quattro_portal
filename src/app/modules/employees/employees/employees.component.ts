import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeResponse, EmployeesResponse, EmployeesSearchRequest } from '../employees.module';
import { EmployeesService } from 'src/app/Core/services/employees.service';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  dataForm!: FormGroup;
  loading = false;
  data: EmployeesResponse[] = [];
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  ClientTotal: number = 0;
   
  constructor(public formBuilder:FormBuilder,public employeeService:EmployeesService,
    public translate: TranslateService,public layoutService: LayoutService){
    this.dataForm = this.formBuilder.group({
      employeeName: [''],
      phone: [''],
      id: [''],
      role:[''],
      userName:['']

      
    });
  }
  async ngOnInit(){
    await this.FillData();
  }
  Search(){
    this.FillData();
  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.ClientTotal=0;

    let filter: EmployeesSearchRequest = {
    
    };
   
    
    this.loading = false;
  }

  openDialog(row: EmployeeResponse | null =null){
    window.scrollTo({top:0,behavior:'smooth'});
    document.body.style.overflow='hidden';
    let content=this.employeeService.SelectedData == null ? 'Create_Employee' : 'Update_Employee';
     this.translate.get(content).subscribe((res:string) =>{
      content=res
     });
     var component=this.layoutService.OpenDialog(AddEmployeeComponent,content);
     this.employeeService.Dialog=component;
     component.OnClose.subscribe(()=>{
      document.body.style.overflow='';
      this.FillData();
     });
  }
  async resetform() {
    this.isResetting = true;
    this.dataForm.reset();
    await this.FillData();
    this.isResetting = false;
  }

  OnChange() {
    if (this.isResetting) { return }; // Do nothing if resetting

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);

  }
  paginate(event: any) {
    this.pageSize = event.rows
    this.first = event.first
    this.FillData(event.first)
    
  }

}
