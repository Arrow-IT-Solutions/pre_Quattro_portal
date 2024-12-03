import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/Core/services/category.service';
import { ImgControlComponent } from 'src/app/layout/component/img-control/img-control.component';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { CategoryImageRequest, CategoryRequest, CategoryUpdateRequest } from '../../categories.module';

@Component({
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.scss'],
  providers: [MessageService]
})
export class VariantsComponent {

  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  genCode: boolean = false;
  centerOptions: any[] = [];
  defultImg = '../../../../../../assets/images/upload.jpg';
  categoryImages: CategoryImageRequest[] = [];

  @ViewChild('imgControl') imgControl: ImgControlComponent;

  brandOptions: any[] = [];
  sizeOptions: any = [];
  colorOptions: any = [];
  fileInput: string;
  file: any;
  images: string[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public categoryService: CategoryService,
    public layoutService: LayoutService,
    public messageService: MessageService,
    public route: ActivatedRoute) {
    this.dataForm = formBuilder.group({

    });



    this.dataForm.valueChanges.subscribe((value) => {

    });
  }


  async ngOnInit() {
    try {
      this.loading = true;

      // this.route.queryParams.subscribe(params => {
      //   if (params['data']) {
      //     const categoryData = JSON.parse(params['data']);
      //     console.log('Received category data:', categoryData);
      //   }
      // });
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

      await this.Save();
    } catch (exceptionVar) {
    } finally {
      this.btnLoading = false;
    }
  }

  async Save() {
    let response;
    this.categoryImages = this.images.map((image, index) => ({
      image: image
    }));
    if (this.categoryService.SelectedData != null) {
      var categoryRequest: CategoryUpdateRequest = {
        uuid: this.categoryService.SelectedData.uuid?.toString(),
        categoryTranslation: this.categoryService.CategoryData.categoryTranslation,
        type: this.categoryService.CategoryData.type,
        categoryImages: this.categoryImages,
        coverImage: this.categoryService.CategoryData.coverImage
      }

      console.log(categoryRequest)

      response = await this.categoryService.Update(categoryRequest)
    } else {
      var updateCategoryRequest: CategoryRequest = {
        categoryTranslation: this.categoryService.CategoryData.categoryTranslation,
        type: this.categoryService.CategoryData.type,
        categoryImages: this.categoryImages,
        coverImage: this.categoryService.CategoryData.coverImage
      }

      response = await this.categoryService.Add(updateCategoryRequest)
    }


    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.categoryService.SelectedData == null) {
        this.resetForm();
      } else {
        this.categoryService.Dialog.close();
      }
    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;
  }

  resetForm() {
    this.dataForm.reset();
  }

  async FillData() {

    if (this.categoryService.SelectedData?.categoryImage) {
      this.images = this.categoryService.SelectedData.categoryImage.map(item => item.image);
    }
  }

  onSelectedFile(file: any) {
    this.file = file;
  }
  AddVariant() {

    if (this.file != undefined || this.file != null || this.file == '') {
      this.images.push(this.file);
      this.file = ''
      this.fileInput = ''
    }


    console.log(this.images)

  }

  deleteImage(index: number) {
    this.images.splice(index, 1);
  }

}
