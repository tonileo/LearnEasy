import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AccountService } from '../../../core/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInput,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  redirectToRegister(){
    this.router.navigateByUrl('/account/register');
  }

  login(loginType: 'default' | 'nonPremiumUser' | 'premiumUser') {
    switch(loginType){
      case 'nonPremiumUser': 
        this.loginForm.value.email = 'tom@jones.com';
        this.loginForm.value.password = 'nonPremiumPa$$w0rd';
        break;
      case 'premiumUser':
        this.loginForm.value.email = 'john@hose.com';
        this.loginForm.value.password = 'premiumPa$$w0rd';
        break;
      case 'default':
        break;
    }

    this.accountService.login(this.loginForm.value).subscribe({
      next: () => {
        this.accountService.getUserInfo();
        this.router.navigateByUrl('/');
      }
    })
  }
}
