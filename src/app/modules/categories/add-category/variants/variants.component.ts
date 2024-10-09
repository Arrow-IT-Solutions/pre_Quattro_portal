import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/Core/services/category.service';
import { ImgControlComponent } from 'src/app/layout/component/img-control/img-control.component';
import { LayoutService } from 'src/app/layout/service/layout.service';

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

  @ViewChild('imgControl') imgControl: ImgControlComponent;
 
  brandOptions: any[] = [];
  sizeOptions: any = [];
  colorOptions: any = [];
  fileInput: string;
  file: any;

  constructor(public formBuilder: FormBuilder,  private router: Router, public productService:CategoryService, public layoutService: LayoutService, public messageService: MessageService) {
    this.dataForm = formBuilder.group({
      code: ['', Validators.required],
      brandIDFK: [''],
      sizeIDFK: [''],
      colorIDFK: [''],
      modelNumber: [''],
      salePrice: [0],
      boughtPrice: [0],
      status: [true]
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

      this.resetForm();

      

      if (this.productService.SelectedData != null) {
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

      // if (this.dataForm.invalid) {
      //   console.log('invalid form ?  : ' + this.dataForm.invalid);

      //   this.submitted = true;
      //   return;
      // }
      await this.Save();
    } catch (exceptionVar) {
    } finally {
      this.btnLoading = false;
    }
  }

  async Save() {
    let response;

    // var productTranslations = Object.entries(this.productService.SelectedData?.productTranslation!).map(([language, translation]) => ({
    //   name: translation.name,
    //   desc: translation.desc,
    //   language: language
    // }));

    

    // if (this.productService.SelectedData?.uuid != '-1') {
    //   //update
    //   var productUpdate: ProductUpdateRequest = {
    //     uuid: this.productService.SelectedData?.uuid?.toString(),
    //     productTranslation: productTranslations,
    //     productVariant: this.ConvertToUpdateRequest(this.variants),
    //     //TODO
       
    //     status: this.productService.SelectedData?.status?.toString(),
    //     imageLink: this.productService.SelectedData?.imageLink
    //   };
    //   response = await this.productService.Update(productUpdate);
    // } else {
      // add

  //     var productAdd: ProductRequest = {
  //       uuid: '',
  //       productTranslation: productTranslations,
  //       productVariant: this.ConvertToAddRequest(this.variants),
  //       //TODO
  //       categoryIDFK: this.productService.SelectedData?.category?.uuid?.toString(),
  //       centerIDFK: this.productService.SelectedData?.center?.uuid?.toString(),
  //       tags: tags,
  //       status: this.productService.SelectedData?.status?.toString(),
  //       imageLink: this.productService.SelectedData?.imageLink
  //     };
  //     response = await this.productService.Add(productAdd);
  //   }
  //   if (response?.requestStatus?.toString() == '200') {
  //     this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);

  //     this.router.navigate(['layout-admin/products']);
  //   } else {
  //     this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
  //   }
  //   this.btnLoading = false;
  //   this.submitted = false;
  }

  resetForm() {
    this.dataForm.reset();
  }

  async FillData() {
  }

  onSelectedFile(file: any) {
    this.file = file;
    // if (this.selectedVariantValue != null) {
    //   this.selectedVariantValue.newImage = file;
    // }
    console.log('image : ', this.file);
  }
  AddVariant() {
    // var item: ProductVariantResponse = {
    //   code: '',
    //   brand: { uuid: undefined },
    //   size: { uuid: undefined },
    //   color: { uuid: undefined },
    //   modelNumber: '',
    //   salePrice: '0',
    //   boughtPrice: '0',
    //   imageLink: '',
    //   status: '1'

    //   // quantity: '0'
    // };
    // item.uuid = Object.keys(this.variants).length.toString();
    // this.variants[Object.keys(this.variants).length.toString()] = item;
    // this.selectedVariantKey = (Object.keys(this.variants).length - 1).toString();
    // this.selectedVariantValue = this.variants[(Object.keys(this.variants).length - 1).toString()];
    // this.FillForm();
    // console.log('adddva : variants :', this.variants);
    // console.log('adddva :  this.selectedVariantKey :', this.selectedVariantKey);
  }

}
