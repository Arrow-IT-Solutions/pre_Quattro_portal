import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RewardsService } from 'src/app/Core/services/rewards.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { RewardsResponse } from '../rewards.module';
import { AddRewardComponent } from '../add-reward/add-reward.component';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
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
  Total: number = 0;
  Type:any[] = [
    { nameAr: 'منتج', nameEn: 'product', value: 0 },
    { nameAr: 'ميزة', nameEn: 'feature', value: 1 }
  ];
  selectedtype:string | null=null;
  constructor(public formBuilder:FormBuilder,public reward:RewardsService,
    public translate: TranslateService,public layoutService: LayoutService){
    this.dataForm = this.formBuilder.group({
      rewardName:[''],
      Type:['']
      
    });
  }
  async ngOnInit(){
    await this.FillData();
  }
  Search(){
    this.FillData();
  }

  async FillData(pageIndex: number = 0) {

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
  getTypeLable(): string {
    return this.layoutService.config.lang == 'ar' ? 'nameAr' : 'nameEn';
  }
  openDialog(row: RewardsResponse | null =null){
    window.scrollTo({top:0,behavior:'smooth'});
    document.body.style.overflow='hidden';
    let content=this.reward.SelectedData == null ? 'Create_Reward' : 'Update_Reward';
     this.translate.get(content).subscribe((res:string) =>{
      content=res
     });
     var component=this.layoutService.OpenDialog(AddRewardComponent,content);
     this.reward.Dialog=component;
     component.OnClose.subscribe(()=>{
      document.body.style.overflow='';
      this.FillData();
     });
  }
  getFirstChar(){}
}
