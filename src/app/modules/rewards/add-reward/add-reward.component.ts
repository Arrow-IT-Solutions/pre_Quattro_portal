import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RewardsService } from 'src/app/Core/services/rewards.service';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-add-reward',
  templateUrl: './add-reward.component.html',
  styleUrls: ['./add-reward.component.scss'],
  providers:[MessageService]
})
export class AddRewardComponent {
  Type:any[] = [
    { nameAr: 'منتج', nameEn: 'product', value: 0 },
    { nameAr: 'ميزة', nameEn: 'feature', value: 1 }
  ];
  selectedtype:string | null=null;
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  constructor(public formBuilder:FormBuilder,public layoutService:LayoutService,public reward:RewardsService){
    this.dataForm=formBuilder.group({
      type:[''],
      RewardNameAr:[''],
      RewardtNameEn:[''],
      notes:[''],
      Quattros:['']

    })
  }
  async ngOnInit() {
    try {
      this.loading = true;

      this.resetForm();

      if (this.reward.SelectedData != null) {
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
