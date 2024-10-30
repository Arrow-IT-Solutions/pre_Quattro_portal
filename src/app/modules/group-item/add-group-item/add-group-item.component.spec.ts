import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupItemComponent } from './add-group-item.component';

describe('AddGroupItemComponent', () => {
  let component: AddGroupItemComponent;
  let fixture: ComponentFixture<AddGroupItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddGroupItemComponent]
    });
    fixture = TestBed.createComponent(AddGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
