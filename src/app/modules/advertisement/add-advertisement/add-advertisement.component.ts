import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdvertisementService } from 'src/app/Core/services/advertisement.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AdRequest, AdUpdateRequest } from '../advertisement.module';

@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.scss'],
  providers: [MessageService]
})
export class AddAdvertisementComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  contryCode: string[] = ["+962", "+963"];
  selectedCode: number | null = null;
  gender: string[] = ["male", "female"];
  file: any;
  fileInput: any
  img: boolean = true;
  selectedgender: string | null = null;
  constructor(
    public formBuilder: FormBuilder,
    public layoutService: LayoutService,
    public advertiseService: AdvertisementService,
    public messageService: MessageService) {
    this.dataForm = formBuilder.group({
      tittleAr: ['', Validators.required],
      tittleEn: ['', Validators.required],
      quattros: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      descAr: ['', Validators.required],
      descEn: ['', Validators.required]
    })
  }
  async ngOnInit() {
    try {
      this.loading = true;
      if (this.advertiseService.SelectedData != null) {
        await this.FillData();
      }
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
    let temp = {
      tittleAr: this.advertiseService.SelectedData?.adTranslation!['ar'].name,
      tittleEn: this.advertiseService.SelectedData?.adTranslation!['en'].name,
      descEn: this.advertiseService.SelectedData?.adTranslation!['en'].description,
      descAr: this.advertiseService.SelectedData?.adTranslation!['ar'].description,
      quattros: this.advertiseService.SelectedData?.quattro,
      startDate: this.advertiseService.SelectedData?.startDate,
      endDate: this.advertiseService.SelectedData?.endDate,
    };
    this.fileInput = this.advertiseService.SelectedData?.image,
      this.img = false
    this.dataForm.patchValue(temp);

  }
  async Save() {
    let response;
    let startDate = new Date(this.dataForm.controls['startDate'].value)
    let endDate = new Date(this.dataForm.controls['endDate'].value)

    var adTranslation = [
      {
        name: this.dataForm.controls['tittleAr'].value == null ? '' : this.dataForm.controls['tittleAr'].value.toString(),
        description: this.dataForm.controls['descAr'].value == null ? '' : this.dataForm.controls['descAr'].value.toString(),
        language: 'ar'
      },
      {
        name: this.dataForm.controls['tittleEn'].value == null ? '' : this.dataForm.controls['tittleEn'].value.toString(),
        description: this.dataForm.controls['descEn'].value == null ? '' : this.dataForm.controls['descEn'].value.toString(),
        language: 'en'
      }
    ];
    if (this.advertiseService.SelectedData != null) {
      // update

      var ad: AdUpdateRequest = {
        uuid: this.advertiseService.SelectedData?.uuid?.toString(),
        adTranslation: adTranslation,
        quattro: this.dataForm.controls['quattros'].value,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        image: this.file
      };

      response = await this.advertiseService.Update(ad);
    } else {
      // add
      var ad: AdRequest = {
        adTranslation: adTranslation,
        quattro: this.dataForm.controls['quattros'].value,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        image: this.file
      };

      console.log(ad)

      response = await this.advertiseService.Add(ad);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.advertiseService.SelectedData == null) {
        this.resetForm();
      } else {
        setTimeout(() => {
          this.advertiseService.Dialog.adHostChild.viewContainerRef.clear();
          this.advertiseService.Dialog.adHostDynamic.viewContainerRef.clear();
        }, 600);
      }
    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;
  }

  OnSelectFile(file) {
    this.file = file;
    this.img = false;
  }



}

