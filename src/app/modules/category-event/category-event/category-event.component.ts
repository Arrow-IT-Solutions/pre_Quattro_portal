import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventCategoryResponse, EventCategorySearchRequest } from '../category-event.module';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { CategoryEventService } from 'src/app/Core/services/category-event.service';
import { AddCategoryEventComponent } from '../add-category-event/add-category-event.component';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-category-event',
  templateUrl: './category-event.component.html',
  styleUrls: ['./category-event.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CategoryEventComponent {
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  dataForm!: FormGroup;
  loading = false;
  data: EventCategoryResponse[] = [];
  eventTotal: number = 0;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;

  constructor(public formBuilder: FormBuilder, public eventCategoryService: CategoryEventService, public translate: TranslateService, public layoutService: LayoutService, public messageService: MessageService, public confirmationService: ConfirmationService) {
    this.dataForm = this.formBuilder.group({
      eventName: ['']

    });
  }

  async ngOnInit() {
    await this.FillData();
  }


  OnChange() {
    if (this.isResetting) { return }; // Do nothing if resetting

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);

  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.eventTotal = 0;
    let filter: EventCategorySearchRequest = {
      uuid: '',
      name: this.dataForm.controls['eventName'].value,
    };

    const response = (await this.eventCategoryService.Search(filter)) as any;
    console.log(response)
    if (response.data == null || response.data.length == 0) {
      this.data = [];
      this.eventTotal = 0;
    } else if (response.data != null && response.data.length != 0) {
      this.data = response.data;
      this.eventTotal = response.data[0];
    }

    this.totalRecords = response.totalRecords;

    this.loading = false;
  }

  OpenDialog(row: EventCategoryResponse | null = null) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    this.eventCategoryService.SelectedData = row
    let content = this.eventCategoryService.SelectedData == null ? 'Create_EventCategory' : 'Update_EventCategory';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(AddCategoryEventComponent, content);
    this.eventCategoryService.Dialog = component;
    component.OnClose.subscribe(() => {
      document.body.style.overflow = '';
      this.FillData();
    });
  }
  paginate(event: any) {
    this.pageSize = event.rows
    this.first = event.first
    this.FillData(event.first)

  }

  confirmDelete(row: EventCategoryResponse) {

    console.log(row)
    this.confirmationService.confirm({
      message: "Do_you_want_to_delete_this_record?",
      header: "Delete_Confirmation",
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.eventCategoryService.Delete(row.uuid!)) as any;

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
