import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventResponse, eventResponse } from '../category-event.module';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { CategoryEventService } from 'src/app/Core/services/category-event.service';
import { AddCategoryEventComponent } from '../add-category-event/add-category-event.component';

@Component({
  selector: 'app-category-event',
  templateUrl: './category-event.component.html',
  styleUrls: ['./category-event.component.scss']
})
export class CategoryEventComponent {
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  dataForm!: FormGroup;
  loading = false;
  data: eventResponse[] = [];
  eventTotal: number = 0;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;

  constructor(public formBuilder:FormBuilder,public event:CategoryEventService,public translate: TranslateService,public layoutService: LayoutService){
    this.dataForm = this.formBuilder.group({
      eventName:['']
     
    });
  }


  OnChange() {
    if (this.isResetting) { return }; // Do nothing if resetting

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);

  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.eventTotal=0;
   
   
    
    this.loading = false;
  }

  openDialog(row: EventResponse | null =null){
    window.scrollTo({top:0,behavior:'smooth'});
    document.body.style.overflow='hidden';
    let content=this.event.SelectedData == null ? 'Create_Event' : 'Update_Event';
     this.translate.get(content).subscribe((res:string) =>{
      content=res
     });
     var component=this.layoutService.OpenDialog(AddCategoryEventComponent,content);
     this.event.Dialog=component;
     component.OnClose.subscribe(()=>{
      document.body.style.overflow='';
      this.FillData();
     });
  }
  paginate(event: any) {
    this.pageSize = event.rows
    this.first = event.first
    this.FillData(event.first)
    
  }

}
