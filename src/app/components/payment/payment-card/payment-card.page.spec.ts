import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCardPage } from './payment-card.page';

describe('PaymentCardPage', () => {
  let component: PaymentCardPage;
  let fixture: ComponentFixture<PaymentCardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCardPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
