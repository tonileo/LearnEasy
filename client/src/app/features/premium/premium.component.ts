import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { StripeService } from '../../core/services/stripe.service';
import { ConfirmationToken, StripeAddressElement, StripeAddressElementChangeEvent, StripePaymentElement, StripePaymentElementChangeEvent } from '@stripe/stripe-js';
import { SnackbarService } from '../../core/services/snackbar.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-premium',
  standalone: true,
  imports: [
    MatButton,
    MatProgressSpinnerModule
  ],
  templateUrl: './premium.component.html',
  styleUrl: './premium.component.scss'
})
export class PremiumComponent implements OnInit, OnDestroy {
  private stripeService = inject(StripeService);
  private snackbarService = inject(SnackbarService);
  private accountService = inject(AccountService);
  private router = inject(Router);
  private addressElement?: StripeAddressElement;
  private paymentElement?: StripePaymentElement;

  public premiumPrice: number = 5;
  private confirmationToken?: ConfirmationToken;
  public loading: boolean = false;
  public completitionStatus = signal<{ address: boolean, card: boolean }>(
    { address: false, card: false }
  );

  async ngOnInit() {
    try {
      this.addressElement = await this.stripeService.createAddressElement();
      this.addressElement.mount('#address-element');
      this.addressElement.on('change', this.handleAddressChange);

      this.paymentElement = await this.stripeService.CreatePaymentElement();
      this.paymentElement.mount('#payment-element');
      this.paymentElement.on('change', this.handlePaymentChange);
    } catch (error: any) {
      this.snackbarService.error(error.message);
    }
  }

  ngOnDestroy(): void {
    this.stripeService.disposeElements();
  }

  handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    this.completitionStatus.update(x => {
      x.address = event.complete;
      return x;
    });
  }

  handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    this.completitionStatus.update(x => {
      x.card = event.complete;
      return x;
    });
  }

  async getConfirmationToken() {
    try {
      const result = await this.stripeService.createConfirmationToken();
      if (result.error) throw new Error(result.error.message);
      this.confirmationToken = result.confirmationToken;
      console.log(this.confirmationToken);
    } catch (error: any) {
      this.snackbarService.error(error.message);
    }
  }

  async confirmPayment() {
    this.loading = true;
    try {
      await this.getConfirmationToken();
      if (this.confirmationToken) {
        const result = await this.stripeService.confirmPayment(this.confirmationToken);

        if (result.paymentIntent?.status === 'succeeded') {
          const paymentResult = this.accountService.upgradeToPremium().subscribe();
          if (paymentResult) {
            this.router.navigateByUrl('/premium/success');
          } else {
            throw new Error('Failed to upgrade account');
          }
        } else if (result.error) {
          throw new Error(result.error.message);
        } else {
          throw new Error('Something went wrong');
        }
      }
    } catch (error: any) {
      this.snackbarService.error(error.message || 'Something went wrong');
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } finally {
      this.loading = false;
    }
  }
}
