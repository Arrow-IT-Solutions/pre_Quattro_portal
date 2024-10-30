import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { CategoryGroupService } from 'src/app/Core/services/category-group.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { CategoryGroupResponse } from '../category-group.module';
import { AddCategoryGroupComponent } from '../add-category-group/add-category-group.component';

@Component({
  selector: 'app-category-group',
  templateUrl: './category-group.component.html',
  styleUrls: ['./category-group.component.scss'],
  providers: [MessageService]
})
export class CategoryGroupComponent {
  dataForm!: FormGroup;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  totalRecords: number = 0;
  pageSize: number = 12;
  first: number = 0;
  
  loading = false;

  constructor(public formBuilder: FormBuilder, public groupService:CategoryGroupService,
    public translate: TranslateService, public layoutService: LayoutService, public messageService: MessageService, ) {
    this.dataForm = this.formBuilder.group({
      groupName: [''],
      Type: ['']

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
  openDialog(row: CategoryGroupResponse | null = null) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    let content = this.groupService.SelectedData == null ? 'Create_Group' : 'Update_Group';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(AddCategoryGroupComponent, content);
    this.groupService.Dialog = component;
    this.groupService.SelectedData = row
    component.OnClose.subscribe(() => {
      document.body.style.overflow = '';
      this.FillData();
    });
  }

}
