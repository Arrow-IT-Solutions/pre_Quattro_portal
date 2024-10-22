import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from 'src/app/layout/service/layout.service';
import { RewardResponse, RewardSearchRequest } from '../rewards.module';
import { AddRewardComponent } from '../add-reward/add-reward.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConstantService } from 'src/app/Core/services/constant.service';
import { ConstantResponse } from 'src/app/Core/services/constant.service';
import { RewardsService } from 'src/app/Core/services/rewards.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class RewardsComponent {
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  dataForm!: FormGroup;
  loading = false;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  typeList: ConstantResponse[] = [];
  Total: number = 0;
  Type: any[] = [
    { nameAr: 'منتج', nameEn: 'product', value: 0 },
    { nameAr: 'ميزة', nameEn: 'feature', value: 1 }
  ];
  data: RewardResponse[] = [];
  selectedtype: string | null = null;
  link = '';
  visible: boolean = false;
  constructor(public formBuilder: FormBuilder, public rewardService: RewardsService,
    public translate: TranslateService, public layoutService: LayoutService, public constantService: ConstantService, public messageService: MessageService, public confirmationService: ConfirmationService) {
    this.dataForm = this.formBuilder.group({
      rewardName: [''],
      Type: ['']

    });
  }
  async ngOnInit() {
    const RewardTypeResponse = await this.constantService.Search('RewardType') as any;
    this.typeList = RewardTypeResponse.data;
    await this.FillData();
  }
  Search() {
    this.FillData();
  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.totalRecords = 0;

    let filter: RewardSearchRequest = {
      uuid: '',
      name: this.dataForm.controls['rewardName'].value,
      rewardType: this.dataForm.controls['Type'].value == null ? null : this.dataForm.controls['Type'].value.toString(),
    };
    const response = (await this.rewardService.Search(filter)) as any;
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
  openDialog(row: RewardResponse | null = null) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    let content = this.rewardService.SelectedData == null ? 'Create_Reward' : 'Update_Reward';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(AddRewardComponent, content);
    this.rewardService.Dialog = component;
    this.rewardService.SelectedData = row
    component.OnClose.subscribe(() => {
      document.body.style.overflow = '';
      this.FillData();
    });
  }

  showDialog(link: string) {
    this.link = link;
    this.visible = true;
  }
  confirmDelete(row: RewardResponse) {

    console.log(row)
    this.confirmationService.confirm({
      message: "Do_you_want_to_delete_this_record?",
      header: "Delete_Confirmation",
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.rewardService.Delete(row.uuid!)) as any;

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
