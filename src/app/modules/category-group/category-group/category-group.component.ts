import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CategoryGroupService } from 'src/app/Core/services/category-group.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { CategoryGroupResponse, CategoryGroupSearchRequest } from '../category-group.module';
import { AddCategoryGroupComponent } from '../add-category-group/add-category-group.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CategoryService } from 'src/app/Core/services/category.service';
import { CategoryResponse, CategorySearchRequest } from '../../categories/categories.module';


@Component({
  selector: 'app-category-group',
  templateUrl: './category-group.component.html',
  styleUrls: ['./category-group.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CategoryGroupComponent {
  dataForm!: FormGroup;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  totalRecords: number = 0;
  pageSize: number = 12;
  first: number = 0;
  data: CategoryGroupResponse[] = [];
  loading = false;
  link = '';
  categories: CategoryResponse[] = [];
  visible: boolean = false;
  constructor(
    public formBuilder: FormBuilder,
    public groupService: CategoryGroupService,
    public translate: TranslateService,
    public layoutService: LayoutService,
    public messageService: MessageService,
    public categoryService: CategoryService,
    public confirmationService: ConfirmationService) {
    this.dataForm = this.formBuilder.group({
      groupName: [''],
      category: ['']

    });
  }
  OnChange() {
    if (this.isResetting) { return }; // Do nothing if resetting

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);

  }
  async ngOnInit() {
    await this.RetriveCategory();
    await this.FillData();
  }
  Search() {
    this.FillData();
  }

  async RetriveCategory() {

    var categoryID: any;

    if (this.categoryService.SelectedData != null) {
      categoryID = this.categoryService.SelectedData.uuid
    }
    else {
      if (this.categoryService.SelectedData != null) {
        //categoryID = this.paymentService.SelectedData?.driver?.uuid,
      }
    }


    let filter: CategorySearchRequest = {

      uuid: categoryID,
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.categoryService.Search(filter) as any

    this.categories = response.data;

  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.totalRecords = 0;
    let filter: CategoryGroupSearchRequest = {
      uuid: '',
      name: this.dataForm.controls['groupName'].value,
      categoryIDFK: this.dataForm.controls['category'].value == null ? null : this.dataForm.controls['category'].value.toString(),
      includeCategory: "1"
    };

    const response = (await this.groupService.Search(filter)) as any;

    if (response.data == null || response.data.length == 0) {
      this.data = [];
      this.totalRecords = 0;
    } else if (response.data != null && response.data.length != 0) {
      this.data = response.data;
      this.totalRecords = response.data[0];
    }

    this.totalRecords = response.totalRecords;

    this.loading = false;
  }
  async resetform() {
    this.isResetting = true;
    this.dataForm.reset();
    await this.FillData();
    this.isResetting = false;
  }
  paginate(event: any) {
    this.pageSize = event.rows
    this.first = event.first
    this.FillData(event.first)

  }
  openDialog(row: CategoryGroupResponse | null = null) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    let content = this.groupService.SelectedData == null ? 'Create_Group' : 'Update_Group';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(AddCategoryGroupComponent, content);
    this.groupService.Dialog = component;
    this.groupService.SelectedData = row
    component.OnClose.subscribe(() => {
      document.body.style.overflow = '';
      this.FillData();
    });
  }
  showDialog(link: string) {
    this.link = link;
    this.visible = true;
  }

  async FillCategory(event: any = null) {

    let filterInput = '';
    if (event != null) {
      filterInput = event.filter
    }

    let filter: CategorySearchRequest = {

      uuid: '',
      pageIndex: "",
      pageSize: '100000'
    }
    const response = await this.categoryService.Search(filter) as any

    this.categories = response.data
  }

  confirmDelete(row: CategoryGroupResponse) {

    console.log(row)
    this.confirmationService.confirm({
      message: "Do_you_want_to_delete_this_record?",
      header: "Delete_Confirmation",
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.groupService.Delete(row.uuid!)) as any;

        this.confirmationService.close();

        this.layoutService.showSuccess(this.messageService, 'toste', true, response.requestMessage);

        this.FillData();

      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      },
    });
  }
}
