import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'; 
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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

  isHomeActive() : boolean {
    return this.router.url.startsWith('/') && 
               !this.router.url.startsWith('/stats') && 
               !this.router.url.startsWith('/profile');
  }
}
