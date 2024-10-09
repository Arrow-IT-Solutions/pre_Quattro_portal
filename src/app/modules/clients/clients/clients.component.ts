import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientSearchRequest, ClientsResponse } from '../clients.module';
import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from 'src/app/layout/service/layout.service';
import { AddClientComponent } from '../add-client/add-client.component';
import { ClientsService } from 'src/app/Core/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  dataForm!: FormGroup;
  loading = false;
  data: ClientsResponse[] = [];
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  ClientTotal: number = 0;
  
  
  constructor(public formBuilder:FormBuilder,public clientService:ClientsService,
    public translate: TranslateService,public layoutService: LayoutService){
    this.dataForm = this.formBuilder.group({
      clientName: [''],
      phone: [''],
      id: [''],
    });
  }
  async ngOnInit(){
    await this.FillData();
  }
  Search(){
    this.FillData();
  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.ClientTotal=0;
    let filter: ClientSearchRequest = {
      
    };
   
    
    this.loading = false;
  }
  
  openDialog(row: ClientsResponse | null =null){
    window.scrollTo({top:0,behavior:'smooth'});
    document.body.style.overflow='hidden';
    let content=this.clientService.SelectedData == null ? 'Create_Client' : 'Update_Client';
     this.translate.get(content).subscribe((res:string) =>{
      content=res
     });
     var component=this.layoutService.OpenDialog(AddClientComponent,content);
     this.clientService.Dialog=component;
     component.OnClose.subscribe(()=>{
      document.body.style.overflow='';
      this.FillData();
     });
  }





  getFirstChar(){}


  async resetform() {
    this.isResetting = true;
    this.dataForm.reset();
    await this.FillData();
    this.isResetting = false;
  }
  OnChange() {
    if (this.isResetting) { return }; // Do nothing if resetting

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);

  }
  paginate(event: any) {
    this.pageSize = event.rows
    this.first = event.first
    this.FillData(event.first)
    
  }

}
