import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnedComponent } from './earned.component';

describe('EarnedComponent', () => {
  let component: EarnedComponent;
  let fixture: ComponentFixture<EarnedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EarnedComponent]
    });
    fixture = TestBed.createComponent(EarnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
