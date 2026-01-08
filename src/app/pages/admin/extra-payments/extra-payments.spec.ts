import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtraPayments } from './extra-payments';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderService } from 'src/app/core/services/header/header';
import { ExtraPaymentService } from 'src/app/core/services/extra-payment/extra-payment';

describe('ExtraPayments', () => {
  let component: ExtraPayments;
  let fixture: ComponentFixture<ExtraPayments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraPayments, HttpClientTestingModule],
      providers: [HeaderService, ExtraPaymentService],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtraPayments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
