import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventResponse, EventSearchRequest } from '../events.module';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { EventsService } from 'src/app/Core/services/events.service';
import { AddEventComponent } from '../add-event/add-event.component';
import { EventCategoryResponse, EventCategorySearchRequest } from '../../category-event/category-event.module';
import { CategoryEventService } from 'src/app/Core/services/category-event.service';
import { MessageService, ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class EventsComponent {
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  dataForm!: FormGroup;
  loading = false;
  data: EventResponse[] = [];
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  EventTotal: number = 0;
  eventCategory: EventCategoryResponse[];


  constructor(public formBuilder: FormBuilder, public eventService: EventsService,
    public translate: TranslateService, public layoutService: LayoutService, public eventCategoryService: CategoryEventService
    , public messageService: MessageService, public confirmationService: ConfirmationService) {
    this.dataForm = this.formBuilder.group({
      clientName: [''],
      phone: [''],
      eventCategory: [''],
    });
  }
  async ngOnInit() {
    await this.RetriveCategory();
    await this.FillData();
  }
  Search() {
    this.FillData();
  }
  async RetriveCategory() {

    let filter: EventCategorySearchRequest = {

      name: '',
      uuid: '',
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.eventCategoryService.Search(filter) as any

    this.eventCategory = response.data,

      await this.ReWriteCategory();

  }
  async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.totalRecords = 0;
    let filter: EventSearchRequest = {
      uuid: '',
      name: this.dataForm.controls['clientName'].value,
      eventCategoryIDFK: this.dataForm.controls['eventCategory'].value.toString(),
      phone: this.dataForm.controls['phone'].value.toString(),
      includeCtegory: '1',
      includeClient: '1',
    };
    const response = (await this.eventService.Search(filter)) as any;
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
  openDialog(row: EventResponse | null = null) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    this.eventService.SelectedData = row;
    let content = this.eventService.SelectedData == null ? 'Create_Event' : 'Update_Event';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(AddEventComponent, content);
    this.eventService.Dialog = component;
    component.OnClose.subscribe(() => {
      document.body.style.overflow = '';
      this.FillData();
    });
  }
  OnChange() {
    if (this.isResetting) { return }; // Do nothing if resetting

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);

  }
  paginate(event: any) {
    this.pageSize = event.rows
    this.first = event.first
    this.FillData(event.first)

  }
  async resetform() {
    this.isResetting = true;
    this.dataForm.reset();
    await this.FillData();
    this.isResetting = false;
  }
  getCategoryLable(): string {
    return this.layoutService.config.lang == 'ar' ? 'nameAr' : 'nameEn';
  }

  ReWriteCategory(): any {

    var categoryDTO: any[] = []

    this.eventCategory.map(category => {
      const translation = category.eventCategoryTranslation?.[this.layoutService.config.lang] as any;
      const name = translation?.name;

      var obj =
      {
        ...category,
        name: `${name}`.trim()

      }

      categoryDTO.push(obj)

    })

    this.eventCategory = categoryDTO;

  }

  async FillCategory(event: any = null) {

    let filterInput = '';
    if (event != null) {
      filterInput = event.filter
    }

    let filter: EventCategorySearchRequest = {

      name: filterInput,
      uuid: '',
      pageIndex: "",
      pageSize: '100000'
    }
    const response = await this.eventCategoryService.Search(filter) as any

    this.eventCategory = response.data
    await this.ReWriteCategory();
  }

  confirmDelete(row: EventResponse) {
    this.confirmationService.confirm({
      message: "Do_you_want_to_delete_this_record?",
      header: "Delete_Confirmation",
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.eventService.Delete(row.uuid!)) as any;

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
