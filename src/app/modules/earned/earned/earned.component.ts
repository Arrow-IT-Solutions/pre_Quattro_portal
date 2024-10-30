import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { EarnedService } from 'src/app/Core/services/earned.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { EarnedResponse } from '../earned.module';
import { AddEarnedComponent } from '../add-earned/add-earned.component';

@Component({
  selector: 'app-earned',
  templateUrl: './earned.component.html',
  styleUrls: ['./earned.component.scss'],
  providers: [MessageService]
})
export class EarnedComponent {
  dataForm!: FormGroup;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  totalRecords: number = 0;
  pageSize: number = 12;
  first: number = 0;
  
  loading = false;

  constructor(public formBuilder: FormBuilder, public earnedService:EarnedService,
    public translate: TranslateService, public layoutService: LayoutService, public messageService: MessageService, ) {
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
  openDialog(row:EarnedResponse | null = null) {
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
