import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEarnedComponent } from './add-earned.component';

describe('AddEarnedComponent', () => {
  let component: AddEarnedComponent;
  let fixture: ComponentFixture<AddEarnedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEarnedComponent]
    });
    fixture = TestBed.createComponent(AddEarnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
