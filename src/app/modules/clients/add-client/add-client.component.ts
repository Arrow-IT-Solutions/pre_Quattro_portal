import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ClientsService } from 'src/app/Core/services/clients.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { ImgControlComponent } from 'src/app/layout/component/img-control/img-control.component';
import { ClientRequest, ClientUpdateRequest } from '../clients.module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
  providers:[MessageService]
})
export class AddClientComponent  {
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


  constructor(public formBuilder:FormBuilder,public layoutService:LayoutService,public clientService:ClientsService){
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

      if (this.clientService.SelectedData != null) {
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
    if (this.clientService.SelectedData != null) {
      // update

      var client: ClientUpdateRequest = {
        
      };

     
    } else {
      // add
      var client: ClientRequest = {
        
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
