import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuccessfulComponent } from './payment-successful.component';

describe('PaymentSuccessfulComponent', () => {
  let component: PaymentSuccessfulComponent;
  let fixture: ComponentFixture<PaymentSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentSuccessfulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
