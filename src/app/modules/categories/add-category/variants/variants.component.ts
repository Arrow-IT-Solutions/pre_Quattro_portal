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

      // currentQuantity: [0]
    });


    // todo : put the first variant (if not empty variants) as a selected variant


    // else {
    //   this.selectedVariantKey = Object.keys(this.productService.SelectedData?.productVariant)[0];
    //   this.selectedVariantValue = Object.values(this.productService.SelectedData?.productVariant)[0];
    //   this.FillForm();
    // }

    this.dataForm.valueChanges.subscribe((value) => {
      console.log('form changed', value);

      // this.selectedVariantValue!.code = this.dataForm.controls['code'].value;
      // this.selectedVariantValue!.brand = { uuid: this.dataForm.controls['brandIDFK'].value };
      // this.selectedVariantValue!.size = { uuid: this.dataForm.controls['sizeIDFK'].value };
      // this.selectedVariantValue!.color = { uuid: this.dataForm.controls['colorIDFK'].value };
      // this.selectedVariantValue!.modelNumber = this.dataForm.controls['modelNumber'].value;
      // this.selectedVariantValue!.salePrice = this.dataForm.controls['salePrice'].value;
      // this.selectedVariantValue!.boughtPrice = this.dataForm.controls['boughtPrice'].value;
      // // this.selectedVariantValue!.currentQuantity = this.dataForm.controls['currentQuantity'].value.toString();
      // this.selectedVariantValue!.currentQuantity = '0';

      // this.selectedVariantValue!.status = this.dataForm.controls['status'].value == true ? '1' : '0';
      // this.selectedVariantValue!.newImage = this.file;
    });
  }


  async ngOnInit() {
    try {
      this.loading = true;
      console.log('HERE')
      // const navigation = this.router.getCurrentNavigation();
      // const state = navigation?.extras?.state as { categoryData: CategoryUpdateRequest | CategoryRequest };

      // console.log('state', state)

      // if (state) {
      //   console.log('Received category data:', state.categoryData);
      // }
      this.route.queryParams.subscribe(params => {
        if (params['data']) {
          const categoryData = JSON.parse(params['data']);
          console.log('Received category data:', categoryData);
          // Now `categoryData` is accessible in this component
        }
      });
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
    console.log('onSubmit');

    try {
      this.btnLoading = true;

      console.log('this.dataFrom : ', this.dataForm);
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

    let categoryData

    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        categoryData = JSON.parse(params['data']);
        console.log('Received category data:', categoryData);
        // Now `categoryData` is accessible in this component
      }
    });

    var categoryRequest: CategoryRequest = {
      categoryTranslation: categoryData.categoryTranslation,
      type: categoryData.type,
      categoryImages: this.categoryImages,
      coverImage: categoryData.coverImage
    }

    console.log(categoryRequest)

    response = await this.categoryService.Add(categoryRequest)
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
