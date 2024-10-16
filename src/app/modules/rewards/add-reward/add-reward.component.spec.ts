import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRewardComponent } from './add-reward.component';

describe('AddRewardComponent', () => {
  let component: AddRewardComponent;
  let fixture: ComponentFixture<AddRewardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRewardComponent]
    });
    fixture = TestBed.createComponent(AddRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
