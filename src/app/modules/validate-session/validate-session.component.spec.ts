import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateSessionComponent } from './validate-session.component';

describe('ValidateSessionComponent', () => {
  let component: ValidateSessionComponent;
  let fixture: ComponentFixture<ValidateSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
