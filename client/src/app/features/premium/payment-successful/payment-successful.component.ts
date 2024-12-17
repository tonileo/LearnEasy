import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-successful',
  standalone: true,
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './payment-successful.component.html',
  styleUrl: './payment-successful.component.scss'
})
export class PaymentSuccessfulComponent {

}
