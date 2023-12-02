import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchOrderModalComponent } from './launch-order-modal.component';

describe('LaunchOrderModalComponent', () => {
  let component: LaunchOrderModalComponent;
  let fixture: ComponentFixture<LaunchOrderModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaunchOrderModalComponent]
    });
    fixture = TestBed.createComponent(LaunchOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
