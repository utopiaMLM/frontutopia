import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTransactionsComponent } from './check-transactions.component';

describe('CheckTransactionsComponent', () => {
  let component: CheckTransactionsComponent;
  let fixture: ComponentFixture<CheckTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
