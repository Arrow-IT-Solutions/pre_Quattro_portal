import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEventComponent } from './category-event.component';

describe('CategoryEventComponent', () => {
  let component: CategoryEventComponent;
  let fixture: ComponentFixture<CategoryEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryEventComponent]
    });
    fixture = TestBed.createComponent(CategoryEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
