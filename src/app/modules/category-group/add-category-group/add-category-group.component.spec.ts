import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryGroupComponent } from './add-category-group.component';

describe('AddCategoryGroupComponent', () => {
  let component: AddCategoryGroupComponent;
  let fixture: ComponentFixture<AddCategoryGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCategoryGroupComponent]
    });
    fixture = TestBed.createComponent(AddCategoryGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
