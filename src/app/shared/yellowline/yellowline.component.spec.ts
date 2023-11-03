import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowlineComponent } from './yellowline.component';

describe('YellowlineComponent', () => {
  let component: YellowlineComponent;
  let fixture: ComponentFixture<YellowlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YellowlineComponent]
    });
    fixture = TestBed.createComponent(YellowlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
