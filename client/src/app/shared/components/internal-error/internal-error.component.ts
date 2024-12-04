import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internal-error',
  standalone: true,
  imports: [],
  templateUrl: './internal-error.component.html',
  styleUrl: './internal-error.component.scss'
})
export class InternalErrorComponent {
  public error?: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras.state?.['error'];
  }
}
