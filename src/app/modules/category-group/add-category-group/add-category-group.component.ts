import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoryGroupService } from 'src/app/Core/services/category-group.service';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-add-category-group',
  templateUrl: './add-category-group.component.html',
  styleUrls: ['./add-category-group.component.scss'],
  providers: [MessageService]
})
export class AddCategoryGroupComponent {
  // Type: any[] = [
  //   { nameAr: 'منتج', nameEn: 'product', value: 0 },
  //   { nameAr: 'ميزة', nameEn: 'feature', value: 1 }
  // ];
  selectedtype: string | null = null;
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  

  constructor(public formBuilder: FormBuilder, public layoutService: LayoutService, public groupService: CategoryGroupService,  public messageService: MessageService) {
    this.dataForm = formBuilder.group({
      type: [''],
      groupNameAr: [''],
      groupNameEn: [''],
      

    })
  }
  async ngOnInit() {
    try {
      this.loading = true;
      

      this.resetForm();

      if (this.groupService.SelectedData != null) {
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
