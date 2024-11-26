import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EarnedService } from 'src/app/Core/services/earned.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { ClientsService } from 'src/app/Core/services/clients.service';
import { ClientsResponse, ClientSearchRequest } from '../../clients/clients.module';
import { UserService } from 'src/app/Core/services/user.service';
import { EarnedUpdateRequest, EarnedRequest } from '../earned.module';

@Component({
  selector: 'app-add-earned',
  templateUrl: './add-earned.component.html',
  styleUrls: ['./add-earned.component.scss'],
  providers: [MessageService]
})
export class AddEarnedComponent {
  selectedtype: string | null = null;
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  clients: ClientsResponse[] = [];


  constructor(
    public formBuilder: FormBuilder,
    public layoutService: LayoutService,
    public earnedService: EarnedService,
    public messageService: MessageService,
    public clientService: ClientsService,
    public userService: UserService) {
    this.dataForm = formBuilder.group({
      clientName: ['', Validators.required],
      quattros: ['', Validators.required]


    })
  }
  async ngOnInit() {
    try {
      this.loading = true;
      await this.RetriveClient();

      this.resetForm();

      if (this.earnedService.SelectedData != null) {
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

    if (this.earnedService.SelectedData != null) {
      clientID = this.earnedService.SelectedData.client.uuid
    }

    let filter: ClientSearchRequest = {

      name: '',
      uuid: '',
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.clientService.Search(filter) as any

    this.clients = response.data,

      await this.ReWriteClient();

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

    if (this.earnedService.SelectedData != null) {
      // update
      var event: EarnedUpdateRequest = {
        uuid: this.earnedService.SelectedData?.uuid?.toString(),
        clientIDFK: this.dataForm.controls['clientName'].value.toString(),
        quattro: this.dataForm.controls['quattros'].value.toString(),
        employeeIDFK: this.userService.currentUser.userUUID.toString()
      };

      response = await this.earnedService.Update(event);
    } else {
      // add
      var event: EarnedRequest = {
        clientIDFK: this.dataForm.controls['clientName'].value.toString(),
        quattro: this.dataForm.controls['quattros'].value.toString(),
        employeeIDFK: this.userService.currentUser.userUUID.toString()
      };

      response = await this.earnedService.Add(event);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.earnedService.SelectedData == null) {
        this.resetForm();
      } else {
        setTimeout(() => {
          this.earnedService.Dialog.adHostChild.viewContainerRef.clear();
          this.earnedService.Dialog.adHostDynamic.viewContainerRef.clear();
        }, 600);
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
      clientName: this.earnedService.SelectedData?.client.uuid,
      quattros: this.earnedService.SelectedData?.quattro,
    };
    this.dataForm.patchValue(temp);

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
