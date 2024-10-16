import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NotificationService } from 'src/app/Core/services/notification.service';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss'],
  providers:[MessageService]
})

export class AddNotificationComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  Type:any[] = [
    { nameAr: 'فردي', nameEn: 'indivisual', value: 0 },
    { nameAr: 'جماعي', nameEn: 'group', value: 1 }
  ];
  selectedtype:string | null=null;


  constructor(public formBuilder:FormBuilder,public layoutService:LayoutService,public notification:NotificationService){
    this.dataForm=formBuilder.group({
      type:[''],
      UserName:[''],
      notes:['']

    })
  }
  async ngOnInit() {
    try {
      this.loading = true;

      this.resetForm();

      if (this.notification.SelectedData != null) {
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
 
  getTypeLable(): string {
    return this.layoutService.config.lang == 'ar' ? 'nameAr' : 'nameEn';
  }

}
