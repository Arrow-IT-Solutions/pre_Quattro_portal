import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoryGroupService } from 'src/app/Core/services/category-group.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { CategoryGroupRequest, CategoryGroupUpdateRequest } from '../category-group.module';
import { CategoryRequest, CategoryResponse, CategorySearchRequest } from '../../categories/categories.module';
import { CategoryService } from 'src/app/Core/services/category.service';

@Component({
  selector: 'app-add-category-group',
  templateUrl: './add-category-group.component.html',
  styleUrls: ['./add-category-group.component.scss'],
  providers: [MessageService]
})
export class AddCategoryGroupComponent {

  selectedtype: string | null = null;
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  categories: CategoryResponse[] = [];
  file: any;
  fileInput: any
  img: boolean = true;

  constructor(
    public formBuilder: FormBuilder,
    public layoutService: LayoutService,
    public groupService: CategoryGroupService,
    public messageService: MessageService,
    public categoryService: CategoryService) {
    this.dataForm = formBuilder.group({
      category: [''],
      groupNameAr: [''],
      groupNameEn: [''],
    })
  }
  async ngOnInit() {
    try {
      this.loading = true;
      await this.RetriveCategory();
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

  async RetriveCategory() {

    var categoryID: any

    let filter: CategorySearchRequest = {

      uuid: categoryID,
      type: '',
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.categoryService.Search(filter) as any

    this.categories = response.data;

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

    var categoryGroupTranslation = [
      {
        name: this.dataForm.controls['groupNameAr'].value == null ? '' : this.dataForm.controls['groupNameAr'].value.toString(),
        language: 'ar'
      },
      {
        name: this.dataForm.controls['groupNameEn'].value == null ? '' : this.dataForm.controls['groupNameEn'].value.toString(),
        language: 'en'
      }
    ];
    if (this.groupService.SelectedData != null) {
      // update

      var categoryGroup: CategoryGroupUpdateRequest = {
        uuid: this.groupService.SelectedData?.uuid?.toString(),
        categoryGroupTranslation: categoryGroupTranslation,
        image: this.file,
        categoryIDFK: this.dataForm.controls['category'].value.toString()
      };

      response = await this.groupService.Update(categoryGroup);
    } else {
      // add
      var categoryGroup: CategoryGroupRequest = {
        categoryGroupTranslation: categoryGroupTranslation,
        image: this.file,
        categoryIDFK: this.dataForm.controls['category'].value.toString()
      };

      response = await this.groupService.Add(categoryGroup);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.groupService.SelectedData == null) {
        this.resetForm();
      } else {
        this.groupService.Dialog.close();
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
      groupNameAr: this.groupService.SelectedData?.categoryGroupTranslation!['ar'].name,
      groupNameEn: this.groupService.SelectedData?.categoryGroupTranslation!['en'].name,
      category: this.groupService.SelectedData?.category.uuid,
    };
    this.file = this.groupService.SelectedData?.image,
      this.img = false
    this.dataForm.patchValue(temp);
  }

  OnSelectFile(file) {
    this.file = file;
    this.img = false;
  }

}
