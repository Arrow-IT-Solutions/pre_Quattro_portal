import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryEventComponent } from './add-category-event.component';

describe('AddCategoryEventComponent', () => {
  let component: AddCategoryEventComponent;
  let fixture: ComponentFixture<AddCategoryEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCategoryEventComponent]
    });
    fixture = TestBed.createComponent(AddCategoryEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
