import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCryptosComponent } from './modal-cryptos.component';

describe('ModalCryptosComponent', () => {
  let component: ModalCryptosComponent;
  let fixture: ComponentFixture<ModalCryptosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCryptosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCryptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
