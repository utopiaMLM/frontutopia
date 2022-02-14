import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverysuccessComponent } from './recoverysuccess.component';

describe('RecoverysuccessComponent', () => {
  let component: RecoverysuccessComponent;
  let fixture: ComponentFixture<RecoverysuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverysuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverysuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
