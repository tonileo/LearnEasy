import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.scss'
})
export class LearnComponent {
  public answearClicked: boolean = false;

  showAnswear(){
    this.answearClicked = !this.answearClicked;
  }
}
