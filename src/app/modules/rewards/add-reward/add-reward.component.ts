import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RewardsService } from 'src/app/Core/services/rewards.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { ConstantService } from 'src/app/Core/services/constant.service';
import { ConstantResponse } from 'src/app/Core/services/constant.service';
import { RewardRequest, RewardUpdateRequest } from '../rewards.module';


@Component({
  selector: 'app-add-reward',
  templateUrl: './add-reward.component.html',
  styleUrls: ['./add-reward.component.scss'],
  providers: [MessageService]
})
export class AddRewardComponent {
  Type: any[] = [
    { nameAr: 'منتج', nameEn: 'product', value: 0 },
    { nameAr: 'ميزة', nameEn: 'feature', value: 1 }
  ];
  selectedtype: string | null = null;
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  typeList: ConstantResponse[] = [];
  file: any;
  fileInput: any
  img: boolean = true;
  constructor(public formBuilder: FormBuilder, public layoutService: LayoutService, public rewardService: RewardsService, public constantService: ConstantService, public messageService: MessageService) {
    this.dataForm = formBuilder.group({
      type: ['', Validators.required],
      RewardNameAr: ['', Validators.required],
      RewardNameEn: ['', Validators.required],
      Quattros: ['', Validators.required]

    })
  }
  async ngOnInit() {
    try {
      this.loading = true;
      const RewardTypeResponse = await this.constantService.Search('RewardType') as any;
      this.typeList = RewardTypeResponse.data;

      this.resetForm();

      if (this.rewardService.SelectedData != null) {
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

    var rewardTranslation = [
      {
        name: this.dataForm.controls['RewardNameAr'].value == null ? '' : this.dataForm.controls['RewardNameAr'].value.toString(),
        language: 'ar'
      },
      {
        name: this.dataForm.controls['RewardNameEn'].value == null ? '' : this.dataForm.controls['RewardNameEn'].value.toString(),
        language: 'en'
      }
    ];
    if (this.rewardService.SelectedData != null) {
      // update

      var reward: RewardUpdateRequest = {
        uuid: this.rewardService.SelectedData?.uuid?.toString(),
        rewardTranslation: rewardTranslation,
        quattro: this.dataForm.controls['Quattros'].value.toString(),
        rewardType: this.dataForm.controls['type'].value.toString(),
        image: this.file
      };

      response = await this.rewardService.Update(reward);
    } else {
      // add
      var reward: RewardRequest = {
        rewardTranslation: rewardTranslation,
        quattro: this.dataForm.controls['Quattros'].value.toString(),
        rewardType: this.dataForm.controls['type'].value.toString(),
        image: this.file
      };

      response = await this.rewardService.Add(reward);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.rewardService.SelectedData == null) {
        this.resetForm();
      } else {
        setTimeout(() => {
          this.rewardService.Dialog.adHostChild.viewContainerRef.clear();
          this.rewardService.Dialog.adHostDynamic.viewContainerRef.clear();
        }, 600);
      }
    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;

  }
  resetForm() {
    this.dataForm.reset();
  }

  async FillData() {

    let temp = {
      RewardNameAr: this.rewardService.SelectedData?.rewardTranslation!['ar'].name,
      RewardNameEn: this.rewardService.SelectedData?.rewardTranslation!['en'].name,
      Quattros: this.rewardService.SelectedData?.quattro,
      type: Number(this.rewardService.SelectedData?.rewardType),
    };
    this.fileInput = this.rewardService.SelectedData?.image,
      this.img = false
    this.dataForm.patchValue(temp);
  }

  getTypeLable(): string {
    return this.layoutService.config.lang == 'ar' ? 'nameAr' : 'nameEn';
  }
  OnSelectFile(file) {
    this.file = file;
    this.img = false;
  }
}
