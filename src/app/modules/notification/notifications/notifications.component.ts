import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AddNotificationComponent } from '../add-notification/add-notification.component';
import { NotificationsResponse } from '../notification.module';
import { NotificationService } from 'src/app/Core/services/notification.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers:[MessageService]
})
export class NotificationsComponent {
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
    { nameAr: 'فردي', nameEn: 'indivisual', value: 0 },
    { nameAr: 'جماعي', nameEn: 'group', value: 1 }
  ];
  selectedtype:string | null=null;

  constructor(public formBuilder:FormBuilder,public notification:NotificationService,
    public translate: TranslateService,public layoutService: LayoutService){
    this.dataForm = this.formBuilder.group({
      UserName:[''],
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
  openDialog(row: NotificationsResponse | null =null){
    window.scrollTo({top:0,behavior:'smooth'});
    document.body.style.overflow='hidden';
    let content=this.notification.SelectedData == null ? 'Create_Notification' : 'Update_Notification';
     this.translate.get(content).subscribe((res:string) =>{
      content=res
     });
     var component=this.layoutService.OpenDialog(AddNotificationComponent,content);
     this.notification.Dialog=component;
     component.OnClose.subscribe(()=>{
      document.body.style.overflow='';
      this.FillData();
     });
  }

}
