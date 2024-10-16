import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventsResponse } from '../events.module';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { EventsService } from 'src/app/Core/services/events.service';
import { AddEventComponent } from '../add-event/add-event.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  dataForm!: FormGroup;
  loading = false;
  data: EventsResponse[] = [];
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  EventTotal: number = 0;
  eventCategory:any[] = [
    { nameAr: '', nameEn: 'Option1', value: 0 },
    { nameAr: '', nameEn: 'Option2', value: 1 }
  ];
  selectedcategoryEvent:string | null=null;

  
  constructor(public formBuilder:FormBuilder,public event:EventsService,
    public translate: TranslateService,public layoutService: LayoutService){
    this.dataForm = this.formBuilder.group({
      clientName: [''],
      phone: [''],
      eventCategory: [''],
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
  openDialog(row: EventsResponse | null =null){
    window.scrollTo({top:0,behavior:'smooth'});
    document.body.style.overflow='hidden';
    let content=this.event.SelectedData == null ? 'Create_Event' : 'Update_Event';
     this.translate.get(content).subscribe((res:string) =>{
      content=res
     });
     var component=this.layoutService.OpenDialog(AddEventComponent,content);
     this.event.Dialog=component;
     component.OnClose.subscribe(()=>{
      document.body.style.overflow='';
      this.FillData();
     });
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
  async resetform() {
    this.isResetting = true;
    this.dataForm.reset();
    await this.FillData();
    this.isResetting = false;
  }
  getCategoryLable(): string {
    return this.layoutService.config.lang == 'ar' ? 'nameAr' : 'nameEn';
  }
}
