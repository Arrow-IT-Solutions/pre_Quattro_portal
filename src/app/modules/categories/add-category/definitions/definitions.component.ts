import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/Core/services/category.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { CategoryTranslationResponse, CategoryRequest, CategoryUpdateRequest } from '../../categories.module';
import { ConstantService } from 'src/app/Core/services/constant.service';
import { ConstantResponse } from 'src/app/Core/services/constant.service';

@Component({
  selector: 'app-definitions',
  templateUrl: './definitions.component.html',
  styleUrls: ['./definitions.component.scss'],
  providers: [MessageService]
})
export class DefinitionsComponent {

  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  centerOptions: any[] = [];
  // tagsNames: string[] = [];
  // selectedImage: image = { id: '-1', imageFile: '', imageOriginalLink: '' };
  defultImg = '../../../../../../assets/images/upload.jpg';
  fileInput: string;
  file: any;
  categoryTypes: ConstantResponse[] = [];
  addCategory: CategoryRequest
  category: CategoryUpdateRequest
  img: boolean = true;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public layoutService: LayoutService,
    public messageService: MessageService,
    public categoryService: CategoryService,
    public constantService: ConstantService) {
    this.dataForm = formBuilder.group({
      type: ['', Validators.required],
      descAr: ['', Validators.required],
      descEn: ['', Validators.required],
    });

    console.log('constr selected data : ', this.categoryService.SelectedData);
  }

  async ngOnInit() {
    console.log('ngOnInit selected data : ', this.categoryService.SelectedData);

    try {
      this.loading = true;
      const categoryTypeResponse = await this.constantService.Search('CategoryType', 2) as any;
      this.categoryTypes = categoryTypeResponse.data;
      this.resetForm();

      if (this.categoryService.SelectedData != null) {
        await this.FillData();
      }
    } catch (exceptionVar) {
      console.log(exceptionVar);
    } finally {
      this.loading = false;
    }
  }

  get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
  }

  async onSubmit() {

    try {
      this.btnLoading = true;

      var categoryTranslation = [
        {
          description: this.dataForm.controls['descAr'].value == null ? '' : this.dataForm.controls['descAr'].value.toString(),
          language: 'ar'
        },
        {
          description: this.dataForm.controls['descEn'].value == null ? '' : this.dataForm.controls['descEn'].value.toString(),
          language: 'en'
        }
      ];

      if (this.categoryService.SelectedData != null) {
        // update

        this.category = {
          uuid: this.categoryService.SelectedData?.uuid?.toString(),
          categoryTranslation: categoryTranslation,
          type: this.dataForm.controls['type'].value.toString(),
          coverImage: this.file
        };
        console.log(this.category)

      } else {
        // add

        this.addCategory = {
          categoryTranslation: categoryTranslation,
          type: this.dataForm.controls['type'].value.toString(),
          coverImage: this.file
        };
        console.log(this.addCategory)

      }
      const categoryData = JSON.stringify(this.categoryService.SelectedData != null ? this.category : this.addCategory);
      this.router.navigate(['layout-admin/categories/add-category/variants'], {
        queryParams: { data: categoryData }
      });
    } catch (exceptionVar) {
    } finally {
      this.btnLoading = false;
    }
  }


  async Save() {

    let response;

    var productTranslationsDictionary: { [key: string]: CategoryTranslationResponse } = {
      ar: {
        uuid: '',
        description: this.dataForm.controls['descAr'].value != null ? this.dataForm.controls['descAr'].value.toString() : '',
        language: 'ar'
      },
      en: {
        uuid: '',
        description: this.dataForm.controls['descEn'].value != null ? this.dataForm.controls['descEn'].value.toString() : '',
        language: 'en'
      }
    };
    // this.categoryService.SelectedData.imageLink = this.file == '' || this.file == null ? '' : this.selectedImage.imageFile;
    this.btnLoading = false;
    this.submitted = false;
  }


  resetForm() {
    this.dataForm.reset();
  }


  async FillData() {

    let temp = {
      type: Number(this.categoryService.SelectedData?.type),
      descAr: this.categoryService.SelectedData?.categoryTranslation!['ar'].description,
      descEn: this.categoryService.SelectedData?.categoryTranslation!['en'].description,
    };
    this.file = this.categoryService.SelectedData?.coverImage,
      this.img = false
    this.dataForm.patchValue(temp);




    // this.selectedImage.imageOriginalLink = this.productService.SelectedData?.imageLink ?? '';


  }
  onSelectedFile(file: any) {
    this.file = file;

    // this.selectedImage.imageFile = file;
    console.log('image : ', this.file);
  }

}
