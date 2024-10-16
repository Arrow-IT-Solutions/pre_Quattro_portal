import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FeedBackResponse } from '../feedback.module';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  dataForm!: FormGroup;
  loading = false;
  data: FeedBackResponse[] = [];
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  Total: number = 0;
  

  constructor(public formBuilder:FormBuilder,
    public translate: TranslateService,public layoutService: LayoutService){
    this.dataForm = this.formBuilder.group({
      UserName:['']
      
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
