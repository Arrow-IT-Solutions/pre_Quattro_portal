import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EventsService } from 'src/app/Core/services/events.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { CountryCodeService } from 'src/app/Core/services/country-code.service';
import { CountryCodeResponse, CountryCodeSearchRequest } from '../../auth/auth.module';
import { EventCategoryResponse, EventCategorySearchRequest } from '../../category-event/category-event.module';
import { CategoryEventService } from 'src/app/Core/services/category-event.service';
import { ClientsResponse, ClientSearchRequest } from '../../clients/clients.module';
import { ClientsService } from 'src/app/Core/services/clients.service';
import { EventRequest, EventUpdateRequest } from '../events.module';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  providers: [MessageService]
})
export class AddEventComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  codes: CountryCodeResponse[] = [];
  eventCategory: EventCategoryResponse[];
  clients: ClientsResponse[]

  constructor(public formBuilder: FormBuilder, public layoutService: LayoutService, public eventService: EventsService
    , public countryCodeService: CountryCodeService, public eventCategoryService: CategoryEventService, public clientService: ClientsService
    , public messageService: MessageService
  ) {
    this.dataForm = formBuilder.group({
      clientName: ['', Validators.required],
      contryCode: ['', Validators.required],
      clientPhone: ['', Validators.required],
      eventCategory: ['', Validators.required],
      nuOfPersons: ['', Validators.required],
      Date: ['', Validators.required]

    })
  }
  async ngOnInit() {
    try {
      this.loading = true;
      await this.RetriveCountryCode();
      await this.RetriveCategory();
      await this.RetriveClient();
      this.resetForm();

      if (this.eventService.SelectedData != null) {
        await this.FillData();
      }
    } catch (exceptionVar) {
      console.log(exceptionVar);
    } finally {
      this.loading = false;
    }
  }

  async RetriveClient() {

    var clientID: any;

    if (this.eventService.SelectedData != null) {
      clientID = this.eventService.SelectedData.client?.uuid
    }
    else {
      if (this.eventService.SelectedData != null) {
        //clientID = this.paymentService.SelectedData?.driver?.uuid,
      }
    }


    let filter: ClientSearchRequest = {

      name: '',
      uuid: clientID,
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.clientService.Search(filter) as any

    this.clients = response.data,

      await this.ReWriteClient();

  }

  async RetriveCategory() {

    var categoryID: any;

    if (this.eventService.SelectedData != null) {
      categoryID = this.eventService.SelectedData.eventCategoryIDFK
    }
    else {
      if (this.eventService.SelectedData != null) {
        //categoryID = this.paymentService.SelectedData?.driver?.uuid,
      }
    }


    let filter: EventCategorySearchRequest = {

      name: '',
      uuid: categoryID,
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.eventCategoryService.Search(filter) as any

    this.eventCategory = response.data,

      await this.ReWriteCategory();

  }

  get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
  }

  async RetriveCountryCode() {

    var code: any;

    if (this.eventService.SelectedData != null) {
      code = this.eventService.SelectedData?.countryCode
    }

    let filter: CountryCodeSearchRequest = {
      name: '',
      uuid: '',
      code: code,
      pageIndex: "",
      pageSize: '100000'
    }

    const response = await this.countryCodeService.Search(filter) as any

    this.codes = response.data;

    await this.ReWriteCode();

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

    let date = new Date(this.dataForm.controls['Date'].value)
    if (this.eventService.SelectedData != null) {
      // update
      var event: EventUpdateRequest = {
        uuid: this.eventService.SelectedData?.uuid?.toString(),
        clientIDFK: this.dataForm.controls['clientName'].value.toString(),
        eventCategoryIDFK: this.dataForm.controls['eventCategory'].value.toString(),
        countryCode: this.dataForm.controls['contryCode'].value.toString(),
        phone: this.dataForm.controls['clientPhone'].value.toString(),
        noOfOPerson: this.dataForm.controls['nuOfPersons'].value.toString(),
        date: date.toISOString(),
      };

      response = await this.eventService.Update(event);
    } else {
      // add
      var event: EventRequest = {
        clientIDFK: this.dataForm.controls['clientName'].value.toString(),
        eventCategoryIDFK: this.dataForm.controls['eventCategory'].value.toString(),
        countryCode: this.dataForm.controls['contryCode'].value.toString(),
        phone: this.dataForm.controls['clientPhone'].value.toString(),
        noOfOPerson: this.dataForm.controls['nuOfPersons'].value.toString(),
        date: date.toISOString(),
      };

      console.log(event)

      response = await this.eventService.Add(event);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.eventService.SelectedData == null) {
        this.resetForm();
      } else {
        this.eventService.Dialog.close();
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


  }

  async FillCodes(event: any = null) {

    let filterInput = '';
    if (event != null) {
      filterInput = event.filter
    }

    let filter: CountryCodeSearchRequest = {

      name: filterInput,
      uuid: '',
      code: "",
      pageIndex: "",
      pageSize: '100000'
    }
    const response = await this.countryCodeService.Search(filter) as any

    this.codes = response.data;

    await this.ReWriteCode()
  }

  ReWriteCode(): any {

    var codeDTO: any[] = []

    this.codes.map(code => {
      const translation = code.countryCodeTranslation?.[this.layoutService.config.lang] as any;
      const fullName = translation?.name;
      const countryCode = code.code

      var obj =
      {
        ...code,
        fullName: `${fullName} ${code.code}`,
        countryCode

      }

      codeDTO.push(obj)

    })

    this.codes = codeDTO;

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

  ReWriteClient(): any {

    var clientDTO: any[] = []

    this.clients.map(client => {
      const translation = client.clientTranslation?.[this.layoutService.config.lang] as any;
      const firstName = translation?.firstName;
      const lastName = translation?.lastName;

      var obj =
      {
        ...client,
        fullName: `${firstName} ${lastName}`.trim()

      }

      clientDTO.push(obj)

    })

    this.clients = clientDTO;

  }

  async FillClient(event: any = null) {

    let filterInput = '';
    if (event != null) {
      filterInput = event.filter
    }

    let filter: ClientSearchRequest = {

      name: filterInput,
      uuid: '',
      pageIndex: "",
      pageSize: '100000'
    }
    const response = await this.clientService.Search(filter) as any

    this.clients = response.data
    await this.ReWriteClient();
  }

}
