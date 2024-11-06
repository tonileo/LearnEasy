import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButton,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
