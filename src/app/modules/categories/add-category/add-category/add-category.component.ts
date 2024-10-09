import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  items: MenuItem[];
  activeIndex = 0;
  constructor(public layoutService: LayoutService) {}
  ngOnInit() {
    this.items = [
      {
        label: this.isAr() ? 'التعريف' : 'Definitions',
        routerLink: 'definitions',
      },
      {
        label: this.isAr() ? 'الصور': 'Images',
        // routerLink: 'variants',
      },
    ];
  }

  isAr(): boolean {
    if (this.layoutService.config.lang == 'ar') {
      return true;
    } else {
      return false;
    }
  }

}
