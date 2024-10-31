import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { GroupItemService } from 'src/app/Core/services/group-item.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { GroupItemResponse, GroupItemSearchRequest } from '../group-item.module';
import { AddGroupItemComponent } from '../add-group-item/add-group-item.component';
import { CategoryGroupResponse, CategoryGroupSearchRequest } from '../../category-group/category-group.module';
import { CategoryGroupService } from 'src/app/Core/services/category-group.service';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class GroupItemComponent {
  dataForm!: FormGroup;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  totalRecords: number = 0;
  pageSize: number = 12;
  first: number = 0;
  groups: CategoryGroupResponse[] = [];
  link = '';
  visible: boolean = false;
  loading = false;
  data: GroupItemResponse[] = [];

  constructor(
    public formBuilder: FormBuilder,
    public groupItemService: GroupItemService,
    public translate: TranslateService,
    public layoutService: LayoutService,
    public messageService: MessageService,
    public groupService: CategoryGroupService,
    public confirmationService: ConfirmationService) {
    this.dataForm = this.formBuilder.group({
      itemName: [''],
      group: ['']

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
    await this.RetriveCategoryGroup();
    await this.FillData();
  }
  Search() {
    this.FillData();
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

  async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.totalRecords = 0;
    let filter: GroupItemSearchRequest = {
      uuid: '',
      name: this.dataForm.controls['itemName'].value,
      categoryGroupIDFK: this.dataForm.controls['group'].value == null ? null : this.dataForm.controls['group'].value.toString(),
      IncludeGroup: "1"
    };

    const response = (await this.groupItemService.Search(filter)) as any;

    console.log(response)

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
  openDialog(row: GroupItemResponse | null = null) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    let content = this.groupItemService.SelectedData == null ? 'Create_GroupItem' : 'Update_GroupItem';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(AddGroupItemComponent, content);
    this.groupItemService.Dialog = component;
    this.groupItemService.SelectedData = row
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

}
