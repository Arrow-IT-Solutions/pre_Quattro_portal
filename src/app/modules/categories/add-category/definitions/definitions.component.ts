import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/Core/services/category.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { CategoryTranslationResponse } from '../../categories.module';

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



  constructor(public formBuilder: FormBuilder, public router: Router, public layoutService: LayoutService, public messageService: MessageService, public categoryService: CategoryService) {
    this.dataForm = formBuilder.group({
      nameAr: ['', Validators.required],
      nameEn: ['', Validators.required],
      category: ['', Validators.required],
      center: ['', Validators.required],
      tags: [''],
      descAr: [''],
      descEn: [''],
      status: [true]
    });

    console.log('constr selected data : ', this.categoryService.SelectedData);
  }

  async ngOnInit() {
    console.log('ngOnInit selected data : ', this.categoryService.SelectedData);

    try {
      this.loading = true;

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
    console.log('onSubmit dataform : ', this.dataForm);

    try {
      this.btnLoading = true;

      // if (this.dataForm.invalid) {
      //   console.log('onSubmit form invaild  :  ', this.dataForm.invalid);

      //   this.submitted = true;
      //   return;
      // }
      // await this.Save();
      this.router.navigate(['layout-admin/categories/add-category/variants']);
    } catch (exceptionVar) {
    } finally {
      this.btnLoading = false;
    }
  }


  async Save() {
    console.log('save');

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
    console.log('fill');

    console.log('fill this.productService.SelectedData : ', this.categoryService.SelectedData);




    // this.selectedImage.imageOriginalLink = this.productService.SelectedData?.imageLink ?? '';


  }
  onSelectedFile(file: any) {
    this.file = file;

    // this.selectedImage.imageFile = file;
    console.log('image : ', this.file);
  }

}
