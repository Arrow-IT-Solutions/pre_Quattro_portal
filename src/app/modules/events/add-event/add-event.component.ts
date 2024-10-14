import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EventsService } from 'src/app/Core/services/events.service';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  providers:[MessageService]
})
export class AddEventComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  countryCode: string[]=["+962","+963"];
  selectedCode: string | null = null;
  eventCategory:any[] = [
    { nameAr: '', nameEn: 'option1', value: 0 },
    { nameAr: '', nameEn: 'option2', value: 1 }
  ];
  clients:any[] = [
    { nameAr: '', nameEn: 'option1', value: 0 },
    { nameAr: '', nameEn: 'option2', value: 1 }
  ];
  selectedcategory:string | null=null;
  selectedclient:string | null=null;

  constructor(public formBuilder:FormBuilder,public layoutService:LayoutService,public event:EventsService){
    this.dataForm=formBuilder.group({
      clientName:[''],
      countryCode:[''],
      clientPhone:[''],
      eventCategory:[''],
      nuOfPersons:[''],
      Date:['']

    })
  }
  async ngOnInit() {
    try {
      this.loading = true;

      this.resetForm();

      if (this.event.SelectedData != null) {
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

    
  }

  resetForm() {
    this.dataForm.reset();
  }

  async FillData() {

 
  }
  getCategoryLable(): string {
    return this.layoutService.config.lang == 'ar' ? 'nameAr' : 'nameEn';
  }

}
