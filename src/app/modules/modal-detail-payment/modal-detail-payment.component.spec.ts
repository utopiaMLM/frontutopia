import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailPaymentComponent } from './modal-detail-payment.component';

describe('ModalDetailPaymentComponent', () => {
  let component: ModalDetailPaymentComponent;
  let fixture: ComponentFixture<ModalDetailPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
