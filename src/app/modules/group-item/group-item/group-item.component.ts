import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { GroupItemService } from 'src/app/Core/services/group-item.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { GroupItemResponse } from '../group-item.module';
import { AddGroupItemComponent } from '../add-group-item/add-group-item.component';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
  providers: [MessageService]
})
export class GroupItemComponent {
  dataForm!: FormGroup;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  totalRecords: number = 0;
  pageSize: number = 12;
  first: number = 0;
  
  loading = false;

  constructor(public formBuilder: FormBuilder, public groupItemService:GroupItemService,
    public translate: TranslateService, public layoutService: LayoutService, public messageService: MessageService, ) {
    this.dataForm = this.formBuilder.group({
      itemName: [''],
      group: ['']

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
  openDialog(row:GroupItemResponse | null = null) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    let content = this.groupItemService.SelectedData == null ? 'Create_GroupItem' : 'Update_GroupItem';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(AddGroupItemComponent, content);
    this.groupItemService.Dialog = component;
    this.groupItemService.SelectedData = row
    component.OnClose.subscribe(() => {
      document.body.style.overflow = '';
      this.FillData();
    });
  }

}
