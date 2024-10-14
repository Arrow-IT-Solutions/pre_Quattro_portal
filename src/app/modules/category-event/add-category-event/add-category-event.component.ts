import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoryEventService } from 'src/app/Core/services/category-event.service';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-add-category-event',
  templateUrl: './add-category-event.component.html',
  styleUrls: ['./add-category-event.component.scss'],
  providers:[MessageService]
})
export class AddCategoryEventComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
 
  constructor(public formBuilder:FormBuilder,public layoutService:LayoutService,public addCategoryEvent:CategoryEventService){
    this.dataForm=formBuilder.group({
      tittleAr:[''],
      tittleEn:[''],
      

    })
  }

  async ngOnInit() {
    try {
      this.loading = true;

      this.resetForm();

      if (this.addCategoryEvent.SelectedData != null) {
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

    this.btnLoading = false;
    this.submitted = false;
  }

}
