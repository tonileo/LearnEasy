import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ad',
  standalone: true,
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './ad.component.html',
  styleUrl: './ad.component.scss'
})
export class AdComponent {

}
