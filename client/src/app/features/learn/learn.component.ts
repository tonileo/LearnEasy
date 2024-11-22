import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FlashCardService } from '../../core/services/flash-card.service';
import { FlashCard } from '../../shared/models/flashCard';
import { ActivatedRoute } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.scss'
})
export class LearnComponent implements OnInit{
  private flashCardService = inject(FlashCardService);
  private activatedRoute = inject(ActivatedRoute)

  public answearClicked: boolean = false;
  public index: number = 0;
  public flashCards: FlashCard[] = [];

  ngOnInit(): void {
    const subjectId: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    if (!subjectId) return;

    this.flashCardService.getRandomFlashCards(+subjectId).subscribe({
      next: result => this.flashCards = result,
      error: error => console.error(error)
    });
  }

  showAnswear(){
    this.answearClicked = !this.answearClicked;
  }

  nextFlashCard(){
    this.answearClicked = false;
    if (this.index < this.flashCards.length - 1){
      this.index++;
    }else{

    }
  }

  editFlashCard(){

  }

  deleteFlashCard(){
    
  }
}
