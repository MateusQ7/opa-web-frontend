import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestarauntRegisterComponent } from './restaraunt-register.component';

describe('RestarauntRegisterComponent', () => {
  let component: RestarauntRegisterComponent;
  let fixture: ComponentFixture<RestarauntRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestarauntRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestarauntRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
