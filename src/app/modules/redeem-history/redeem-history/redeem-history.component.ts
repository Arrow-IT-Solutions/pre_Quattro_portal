import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { RedeemHistoryService } from 'src/app/Core/services/redeem-history.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { RewardHistoryRecieved, RewardHistoryResponse, RewardHistorySearchRequest } from '../redeem-history.module';

@Component({
  selector: 'app-redeem-history',
  templateUrl: './redeem-history.component.html',
  styleUrls: ['./redeem-history.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RedeemHistoryComponent {
  dataForm!: FormGroup;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  totalRecords: number = 0;
  pageSize: number = 12;
  first: number = 0;
  data: RewardHistoryResponse[] = [];

  loading = false;

  constructor(
    public formBuilder: FormBuilder,
    public rewardHistoryService: RedeemHistoryService,
    public translate: TranslateService,
    public layoutService: LayoutService,
    public messageService: MessageService,) {
    this.dataForm = this.formBuilder.group({
      clientName: [''],
      itemName: [''],
      clientID: ['']
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
    let filter: RewardHistorySearchRequest = {
      uuid: '',
      clientName: this.dataForm.controls['clientName'].value,
      includeReward: '1',
      rewardName: this.dataForm.controls['itemName'].value,
      includeClients: "1",
      clientIDFK: this.dataForm.controls['clientID'].value,
    };

    const response = (await this.rewardHistoryService.Search(filter)) as any;

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


  async Recieved(row: RewardHistoryResponse) {

    let response
    var recieved: RewardHistoryRecieved = {
      uuid: row.uuid?.toString(),
    };

    response = await this.rewardHistoryService.Recieved(recieved);

    this.FillData();


  }


}
