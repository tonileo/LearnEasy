import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FlashCardService } from '../../core/services/flash-card.service';
import { FlashCard } from '../../shared/models/flashCard';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { FlashCardReviewedList } from '../../shared/models/flashCardReviewedList';

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
  private router = inject(Router);

  private subjectId?: string | null;
  public answearClicked: boolean = false;
  public index: number = 0;
  public flashCards: FlashCard[] = [];

  ngOnInit(): void {
    console.log(this.flashCards);
    this.subjectId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!this.subjectId) return;

    this.flashCardService.getRandomFlashCards(+this.subjectId).subscribe({
      next: result => this.flashCards = result,
      error: error => console.error(error)
    });
    console.log(this.flashCards);
  }

  showAnswear(){
    this.answearClicked = !this.answearClicked;
  }

  nextFlashCard(){
    this.answearClicked = false;
    if (this.index < this.flashCards.length - 1){
      this.index++;
    }else{
      this.submitReviewedFlashCards();
    }
  }

  submitReviewedFlashCards(){
    const reviewedFlashCards: FlashCardReviewedList[] = this.flashCards.map(card => ({
      id: card.id
    }));

    this.flashCardService.patchLastReviewedFlashCard(reviewedFlashCards).subscribe({
      next: () => {
        this.router.navigateByUrl("/subject/" + this.subjectId);
      }
    });
  }

  editFlashCard(){}
  deleteFlashCard(){}
}
