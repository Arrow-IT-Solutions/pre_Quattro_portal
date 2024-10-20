import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AdResponse, AdvertiseSearchRequest } from '../advertisement.module';
import { AdvertisementService } from 'src/app/Core/services/advertisement.service';
import { AddAdvertisementComponent } from '../add-advertisement/add-advertisement.component';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.scss']
})
export class AdvertisementsComponent {
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  dataForm!: FormGroup;
  loading = false;
  data: AdResponse[] = [];
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  AdvertisementTotal: number = 0;
  adTotal: Number = 0;
  link = '';
  visible: boolean = false;
  constructor(public formBuilder: FormBuilder, public adService: AdvertisementService, public translate: TranslateService, public layoutService: LayoutService) {
    this.dataForm = this.formBuilder.group({
      AdName: [''],
      startDate: [''],
      endDate: [''],
      id: [''],
    });
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
    this.AdvertisementTotal = 0;
    const fromDate = this.dataForm.controls['startDate'].value == '' ? '' : new Date(this.dataForm.controls['startDate'].value.toISOString())
    const toDate = this.dataForm.controls['endDate'].value == '' ? '' : new Date(this.dataForm.controls['endDate'].value.toISOString())
    let filter: AdvertiseSearchRequest = {
      uuid: '',
      name: this.dataForm.controls['AdName'].value,
      startDate: fromDate.toLocaleString(),
      endDate: toDate.toLocaleString()
    };
    const response = (await this.adService.Search(filter)) as any;
    console.log('Response: ', response)
    if (response.data == null || response.data.length == 0) {
      this.data = [];
      this.adTotal = 0;
    } else if (response.data != null && response.data.length != 0) {
      this.data = response.data;
      this.adTotal = response.data[0];
    }

    this.totalRecords = response.totalRecords;

    this.loading = false;
  }

  OpenDialog(row: AdResponse | null = null) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    this.adService.SelectedData = row;
    let content = this.adService.SelectedData == null ? 'Create_Advertise' : 'Update_ِAdvertise';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(AddAdvertisementComponent, content);
    this.adService.Dialog = component;
    component.OnClose.subscribe(() => {
      document.body.style.overflow = '';
      this.FillData();
    });
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

  showDialog(link: string) {
    this.link = link;
    this.visible = true;
  }

}
