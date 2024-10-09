import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryResponse, CategorySearchRequest, EmployeeTranslationResponse } from '../categories.module';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/Core/services/category.service';
import { AddCategoryComponent } from '../add-category/add-category/add-category.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [MessageService]
})
export class CategoriesComponent {
  dataForm!: FormGroup;
  loading = false;
  data: CategoryResponse[] = [];
 
  categoryTotal: number = 0;
  
  pageSize: number = 12;
 
  totalRecords: number = 0;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;

  constructor(
    public layoutService: LayoutService,

    
    public categoryService: CategoryService,
    public messageService: MessageService,
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    public router:Router
  ) {
    this.dataForm = this.formBuilder.group({
      name: [''],
      centerIDFK: [''],
      creationDate: ['']
    });
  }

  async ngOnInit() {
    await this.FillData();
    
  }

  Search() {
    this.FillData();
  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;

    this.data = [];
    this.categoryService.SelectedData = null;
    this.categoryTotal = 0;

    let filter: CategorySearchRequest = {
    
    };
    this.loading = false;
  }


  OpenCategory(row: CategoryResponse | null = null) {
    this.categoryService.SelectedData = row;
    this.router.navigate(['layout-admin/categories/add-category/definitions']);
  }
  getFirstChar(trans: { [key: string]: EmployeeTranslationResponse } | undefined): string{

    console.log('xxxxxxxxxxxxxxxx');

    console.log('trans : ', trans);

    var char = 'U';

    if (trans == undefined || trans == null) {
      char = this.layoutService.config.lang == 'ar' ? 'غ' : 'U';
    } else {
      var response;

      if (this.layoutService.config.lang == 'ar') {
        response = trans!['ar'];
        char = response == null ? 'غ' : response!.name!.split('')[0].toUpperCase();
      } else {
        response = trans!['en'];
        char = response == null ? 'U' : response!.name!.split('')[0].toUpperCase();
      }
    }
    console.log('char : ', char);

    return char;

  }

  async resetForm() {
    this.isResetting = true;

    this.dataForm.reset();
    await this.FillData();
    this.isResetting = false;
  }

  OnChange() {
    if (this.isResetting) return; // Do nothing if resetting
    {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.FillData();
      }, this.doneTypingInterval);
    }
  }


  paginate(event: any) {
    this.FillData(event.pageIndex);
  }

}
