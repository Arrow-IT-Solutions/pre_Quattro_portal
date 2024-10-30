import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GroupItemService } from 'src/app/Core/services/group-item.service';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-add-group-item',
  templateUrl: './add-group-item.component.html',
  styleUrls: ['./add-group-item.component.scss'],
  providers: [MessageService]
})
export class AddGroupItemComponent {
  
  selectedtype: string | null = null;
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  

  constructor(public formBuilder: FormBuilder, public layoutService: LayoutService, public groupItemService:GroupItemService,  public messageService: MessageService) {
    this.dataForm = formBuilder.group({
      categoryGroup: [''],
      itemNameAr: [''],
      itemNameEn: [''],
      price:['']
      

    })
  }
  async ngOnInit() {
    try {
      this.loading = true;
      

      this.resetForm();

      if (this.groupItemService.SelectedData != null) {
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



      if (this.dataForm.invalid) {
        this.submitted = true;
        return;
      }
      await this.Save();
    } catch (exceptionVar) {
    } finally {
      this.btnLoading = false;
    }
  }
  async Save() {
   

  }
  resetForm() {
    this.dataForm.reset();
  }

  async FillData() {

    
  }

 
  

}
