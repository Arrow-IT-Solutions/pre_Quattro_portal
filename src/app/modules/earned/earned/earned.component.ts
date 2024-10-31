import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EarnedService } from 'src/app/Core/services/earned.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { EarnedResponse, EarnedSearchRequest } from '../earned.module';
import { AddEarnedComponent } from '../add-earned/add-earned.component';

@Component({
  selector: 'app-earned',
  templateUrl: './earned.component.html',
  styleUrls: ['./earned.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class EarnedComponent {
  dataForm!: FormGroup;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  totalRecords: number = 0;
  pageSize: number = 12;
  first: number = 0;
  data: EarnedResponse[] = [];

  loading = false;

  constructor(
    public formBuilder: FormBuilder,
    public earnedService: EarnedService,
    public translate: TranslateService,
    public layoutService: LayoutService,
    public messageService: MessageService,) {
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
    let filter: EarnedSearchRequest = {
      uuid: '',
      clientName: this.dataForm.controls['clientName'].value,
      includeClient: "1",
      includeEmployee: "1"
    };

    const response = (await this.earnedService.Search(filter)) as any;

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
  openDialog(row: EarnedResponse | null = null) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    let content = this.earnedService.SelectedData == null ? 'Create_earned' : 'Update_earned';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(AddEarnedComponent, content);
    this.earnedService.Dialog = component;
    this.earnedService.SelectedData = row
    component.OnClose.subscribe(() => {
      document.body.style.overflow = '';
      this.FillData();
    });
  }


}
