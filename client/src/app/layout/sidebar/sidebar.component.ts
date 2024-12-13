import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private router = inject(Router);
  private accountService = inject(AccountService);

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.accountService.currentUser.set(null);
        this.router.navigateByUrl('/account/login');
      }
    })
  }

  isHomeActive(): boolean {
    return this.router.url.startsWith('/') &&
      !this.router.url.startsWith('/profile') &&
      !this.router.url.startsWith('/account') &&
      !this.router.url.startsWith('/test-error');
  }
}
