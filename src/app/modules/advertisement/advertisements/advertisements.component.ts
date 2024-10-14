import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AdResponse, AdvertiseResponse, AdvertiseSearchRequest } from '../advertisement.module';
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
  
  constructor(public formBuilder:FormBuilder,public Advertise:AdvertisementService,public translate: TranslateService,public layoutService: LayoutService){
    this.dataForm = this.formBuilder.group({
      AdName: [''],
      startDate: [''],
      endDate: [''],

      id: [''],
    });
  }
  async ngOnInit(){
    await this.FillData();
  }
  Search(){
    this.FillData();
  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.AdvertisementTotal=0;
    let filter: AdvertiseSearchRequest = {
      
    };
   
    
    this.loading = false;
  }
  
  openDialog(row: AdvertiseResponse | null =null){
    window.scrollTo({top:0,behavior:'smooth'});
    document.body.style.overflow='hidden';
    let content=this.Advertise.SelectedData == null ? 'Create_Advertise' : 'Update_ِAdvertise';
     this.translate.get(content).subscribe((res:string) =>{
      content=res
     });
     var component=this.layoutService.OpenDialog(AddAdvertisementComponent,content);
     this.Advertise.Dialog=component;
     component.OnClose.subscribe(()=>{
      document.body.style.overflow='';
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

}
