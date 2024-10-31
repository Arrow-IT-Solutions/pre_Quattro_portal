import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GroupItemService } from 'src/app/Core/services/group-item.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { CategoryGroupResponse, CategoryGroupSearchRequest } from '../../category-group/category-group.module';
import { CategoryGroupService } from 'src/app/Core/services/category-group.service';
import { GroupItemRequest, GroupItemUpdateRequest } from '../group-item.module';

@Component({
  selector: 'app-add-group-item',
  templateUrl: './add-group-item.component.html',
  styleUrls: ['./add-group-item.component.scss'],
  providers: [MessageService]
})
export class AddGroupItemComponent {

  selectedtype: string | null = null;
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  groups: CategoryGroupResponse[] = [];
  file: any;
  fileInput: any
  img: boolean = true;

  constructor(
    public formBuilder: FormBuilder,
    public layoutService: LayoutService,
    public groupItemService: GroupItemService,
    public messageService: MessageService,
    public groupService: CategoryGroupService) {
    this.dataForm = formBuilder.group({
      categoryGroup: [''],
      itemNameAr: [''],
      itemNameEn: [''],
      descriptionAr: [''],
      descriptionEn: [''],
      price: ['']
    })
  }

  async ngOnInit() {
    try {
      this.loading = true;

      await this.RetriveCategoryGroup();
      this.resetForm();

      if (this.groupItemService.SelectedData != null) {
        await this.FillData();
      }
    } catch (exceptionVar) {
      console.log(exceptionVar);
    } finally {
      this.loading = false;
    }
  }

  async RetriveCategoryGroup() {

    var categoryID: any;

    if (this.groupService.SelectedData != null) {
      categoryID = this.groupService.SelectedData.uuid
    }


    let filter: CategoryGroupSearchRequest = {
      uuid: categoryID,
      name: '',
      includeCategory: '0',
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.groupService.Search(filter) as any

    this.groups = response.data;
    await this.ReWriteCategoryGroup();
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

    var groupItemTranslation = [
      {
        name: this.dataForm.controls['itemNameAr'].value == null ? '' : this.dataForm.controls['itemNameAr'].value.toString(),
        description: this.dataForm.controls['descriptionAr'].value == null ? '' : this.dataForm.controls['descriptionAr'].value.toString(),
        language: 'ar'
      },
      {
        name: this.dataForm.controls['itemNameEn'].value == null ? '' : this.dataForm.controls['itemNameEn'].value.toString(),
        description: this.dataForm.controls['descriptionEn'].value == null ? '' : this.dataForm.controls['descriptionEn'].value.toString(),
        language: 'en'
      }
    ];
    if (this.groupService.SelectedData != null) {
      // update

      var groupItem: GroupItemUpdateRequest = {
        uuid: this.groupService.SelectedData?.uuid?.toString(),
        groupItemTranslation: groupItemTranslation,
        image: this.file,
        categoryGroupIDFK: this.dataForm.controls['categoryGroup'].value.toString(),
        price: this.dataForm.controls['price'].value.toString(),
      };

      response = await this.groupItemService.Update(groupItem);
    } else {
      // add
      var groupItem: GroupItemRequest = {
        groupItemTranslation: groupItemTranslation,
        image: this.file,
        categoryGroupIDFK: this.dataForm.controls['categoryGroup'].value.toString(),
        price: this.dataForm.controls['price'].value.toString()
      };

      response = await this.groupItemService.Add(groupItem);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.groupService.SelectedData == null) {
        this.resetForm();
      } else {
        this.groupItemService.Dialog.close();
      }
    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;
  }

  resetForm() {
    this.dataForm.reset();
    this.file = ''
  }

  async FillData() {
    let temp = {
      itemNameAr: this.groupItemService.SelectedData?.groupItemTranslation!['ar'].name,
      itemNameEn: this.groupItemService.SelectedData?.groupItemTranslation!['en'].name,
      descriptionEn: this.groupItemService.SelectedData?.groupItemTranslation!['en'].description,
      descriptionAr: this.groupItemService.SelectedData?.groupItemTranslation!['en'].description,
      categoryGroup: this.groupItemService.SelectedData?.categoryGroup.uuid,
      price: this.groupItemService.SelectedData?.price
    };
    this.file = this.groupItemService.SelectedData?.image,
      this.img = false
    this.dataForm.patchValue(temp);

  }

  ReWriteCategoryGroup(): any {

    var categoryDTO: any[] = []

    this.groups.map(group => {
      const translation = group.categoryGroupTranslation?.[this.layoutService.config.lang] as any;
      const name = translation?.name;

      var obj =
      {
        ...group,
        name: `${name}`.trim()

      }

      categoryDTO.push(obj)

    })

    this.groups = categoryDTO;

  }

  async FillCategory(event: any = null) {

    let filterInput = '';
    if (event != null) {
      filterInput = event.filter
    }

    let filter: CategoryGroupSearchRequest = {

      uuid: '',
      name: filterInput,
      categoryIDFK: '',
      includeCategory: '',
      pageIndex: "",
      pageSize: '100000'
    }
    const response = await this.groupService.Search(filter) as any

    this.groups = response.data

    await this.ReWriteCategoryGroup();
  }

  OnSelectFile(file) {
    this.file = file;
    this.img = false;
  }

}
