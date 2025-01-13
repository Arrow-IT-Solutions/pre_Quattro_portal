import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoryEventService } from 'src/app/Core/services/category-event.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { EventCategoryRequest, EventCategoryUpdateRequest } from '../category-event.module';

@Component({
  selector: 'app-add-category-event',
  templateUrl: './add-category-event.component.html',
  styleUrls: ['./add-category-event.component.scss'],
  providers: [MessageService]
})
export class AddCategoryEventComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;

  constructor(public formBuilder: FormBuilder, public layoutService: LayoutService, public categoryEventService: CategoryEventService, public messageService: MessageService) {
    this.dataForm = formBuilder.group({
      tittleAr: ['', Validators.required],
      tittleEn: ['', Validators.required],
    })
  }

  async ngOnInit() {
    try {
      this.loading = true;

      this.resetForm();

      if (this.categoryEventService.SelectedData != null) {
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
      tittleAr: this.categoryEventService.SelectedData?.eventCategoryTranslation!['ar'].name,
      tittleEn: this.categoryEventService.SelectedData?.eventCategoryTranslation!['en'].name,
    };
    this.dataForm.patchValue(temp);

  }

  async Save() {

    let response;

    var eventCategoryTranslation = [
      {
        name: this.dataForm.controls['tittleAr'].value == null ? '' : this.dataForm.controls['tittleAr'].value.toString(),
        language: 'ar'
      },
      {
        name: this.dataForm.controls['tittleEn'].value == null ? '' : this.dataForm.controls['tittleEn'].value.toString(),
        language: 'en'
      }
    ];
    if (this.categoryEventService.SelectedData != null) {
      // update

      var eventCategory: EventCategoryUpdateRequest = {
        uuid: this.categoryEventService.SelectedData?.uuid?.toString(),
        eventCategoryTranslation: eventCategoryTranslation,
      };

      response = await this.categoryEventService.Update(eventCategory);
    } else {
      // add
      var eventCategory: EventCategoryRequest = {
        eventCategoryTranslation: eventCategoryTranslation,
      };

      response = await this.categoryEventService.Add(eventCategory);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.categoryEventService.SelectedData == null) {
        this.resetForm();
      } else {
        setTimeout(() => {
          this.categoryEventService.Dialog.adHostChild.viewContainerRef.clear();
          this.categoryEventService.Dialog.adHostDynamic.viewContainerRef.clear();
        }, 600);
      }
    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;
  }

}
