import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdvertisementService } from 'src/app/Core/services/advertisement.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AdRequest, AdUpdateRequest } from '../advertisement.module';

@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.scss'],
  providers:[MessageService]
})
export class AddAdvertisementComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  contryCode: string[]=["+962","+963"];
  selectedCode: number | null = null;
  gender:string[]=["male","female"];
  selectedgender:string | null=null;
  constructor(public formBuilder:FormBuilder,public layoutService:LayoutService,public advertiseService:AdvertisementService){
    this.dataForm=formBuilder.group({
      tittleAr:[''],
      tittleEn:[''],
      quattros:[''],
      startDate:[''],
      endDate:['']

    })
  }
  async ngOnInit() {
    try {
      this.loading = true;

      this.resetForm();

      if (this.advertiseService.SelectedData != null) {
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
  
  resetForm() {
    this.dataForm.reset();
  }

  async FillData() {

 
  }
  async Save() {

    let response;
    let startDate = new Date(this.dataForm.controls['startDate'].value)
    let endDate = new Date(this.dataForm.controls['endDate'].value)



    var AdTranslation = [
      {
        clientName: this.dataForm.controls['tittleAr'].value == null ? '' : this.dataForm.controls['tittleAr'].value.toString(),
        language: 'ar'
      },
      {
        clientName: this.dataForm.controls['tittleEn'].value == null ? '' : this.dataForm.controls['tittleEn'].value.toString(),
        language: 'en'
      }
    ];
    if (this.advertiseService.SelectedData != null) {
      // update

      var Ad: AdUpdateRequest = {
        
      };

     
    } else {
      // add
      var Ad: AdRequest = {
       
      };

      

    }

    

    this.btnLoading = false;
    this.submitted = false;
  }



}

