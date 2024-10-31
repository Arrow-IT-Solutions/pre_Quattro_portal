import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TransferService } from 'src/app/Core/services/transfer.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { TransferResponse, TransferSearchRequest } from '../transfer.module';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TransferComponent {
  dataForm!: FormGroup;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  totalRecords: number = 0;
  pageSize: number = 12;
  first: number = 0;
  data: TransferResponse[] = [];
  loading = false;

  constructor(
    public formBuilder: FormBuilder,
    public transferService: TransferService,
    public translate: TranslateService,
    public layoutService: LayoutService,
    public messageService: MessageService,
    public confirmationService: ConfirmationService) {
    this.dataForm = this.formBuilder.group({
      clientName: [''],


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
    await this.FillData();
  }
  Search() {
    this.FillData();
  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.totalRecords = 0;
    let filter: TransferSearchRequest = {
      uuid: '',
      clientName: this.dataForm.controls['clientName'].value,
      includeClients: "1",
    };

    const response = (await this.transferService.Search(filter)) as any;

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

  confirmDelete(row: TransferResponse) {

    console.log(row)
    this.confirmationService.confirm({
      message: "Do_you_want_to_delete_this_record?",
      header: "Delete_Confirmation",
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.transferService.Delete(row.uuid!)) as any;

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
