import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterChooserComponent } from './register-chooser.component';

describe('RegisterChooserComponent', () => {
  let component: RegisterChooserComponent;
  let fixture: ComponentFixture<RegisterChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterChooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
