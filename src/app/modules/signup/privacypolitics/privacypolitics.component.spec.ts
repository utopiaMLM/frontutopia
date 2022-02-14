import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacypoliticsComponent } from './privacypolitics.component';

describe('PrivacypoliticsComponent', () => {
  let component: PrivacypoliticsComponent;
  let fixture: ComponentFixture<PrivacypoliticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacypoliticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacypoliticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
