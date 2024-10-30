import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { TransferService } from 'src/app/Core/services/transfer.service';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  providers: [MessageService]
})
export class TransferComponent {
  dataForm!: FormGroup;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  totalRecords: number = 0;
  pageSize: number = 12;
  first: number = 0;
  
  loading = false;

  constructor(public formBuilder: FormBuilder, public transfer:TransferService,
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
  

}
