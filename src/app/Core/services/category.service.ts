import { Injectable } from '@angular/core';
import { CategoryResponse } from 'src/app/modules/categories/categories.module';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public SelectedData: CategoryResponse | null = null;
  public Dialog: any | null = null;

  constructor() { }
}
