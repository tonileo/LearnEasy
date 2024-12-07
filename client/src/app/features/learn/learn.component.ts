import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FlashCardService } from '../../core/services/flash-card.service';
import { FlashCard } from '../../shared/models/flashCard';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { FlashCardReviewedList } from '../../shared/models/flashCardReviewedList';
import { DialogService } from '../../core/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFlashCardDialogComponent } from '../subject/add-flash-card-dialog/add-flash-card-dialog.component';
import { LearnMoreComponent } from './learn-more/learn-more.component';

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
export class LearnComponent implements OnInit {
  private flashCardService = inject(FlashCardService);
  private activatedRoute = inject(ActivatedRoute);
  private dialogService = inject(DialogService);
  readonly dialog = inject(MatDialog);
  private router = inject(Router);

  public flashCards: FlashCard[] = [];
  public answerClicked: boolean = false;
  public index: number = 0;

  private subjectId?: string | null;
  private reviewedFlashCardIds: number[] = [];
  private firstReview: boolean = false;
  private cycleCount: number = 4;

  ngOnInit(): void {
    this.subjectId = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadData();
  }

  private loadData() {
    if (!this.subjectId) return;
    this.flashCardService.getRandomFlashCards(+this.subjectId).subscribe({
      next: result => this.flashCards = result,
      error: error => console.error(error)
    });
  }

  showAnswer() {
    this.answerClicked = !this.answerClicked;
  }

  rateFlashCard(feedback: 'Great' | 'Ok' | 'Bad') {
    this.answerClicked = false;

    switch (feedback) {
      case 'Great':
        this.reviewedFlashCardIds.push(+this.flashCards[this.index].id);
        this.firstReview ? this.secondReviewFlashCards() : this.firstReviewFlashCards();
        break;
      case 'Ok':
        this.moveFlashCardToEnd();
        break;
      case 'Bad':
        this.moveFlashCardToCyclePosition();
        break;
    }
  }

  private moveFlashCardToEnd() {
    const currentFlashCard = this.flashCards[this.index];
    this.flashCards.splice(this.index, 1);
    this.flashCards.push(currentFlashCard);
  }

  private moveFlashCardToCyclePosition() {
    const currentFlashCard = this.flashCards[this.index];
    this.flashCards.splice(this.index, 1);
    const newIndex = (this.index + this.cycleCount) % (this.flashCards.length + 1);
    this.flashCards.splice(newIndex, 0, currentFlashCard);
  }

  private getNextIndex() {
    do {
      this.index = (this.index + 1) % this.flashCards.length;
    } while (this.reviewedFlashCardIds.includes(+this.flashCards[this.index].id));
  }

  private firstReviewFlashCards() {
    if (this.reviewedFlashCardIds.length === this.flashCards.length) {
      this.firstReview = true;
      this.reviewedFlashCardIds = [];
      this.index = 0;
      return;
    }
    this.getNextIndex();
  }

  private secondReviewFlashCards() {
    if (this.reviewedFlashCardIds.length === this.flashCards.length) {
      this.submitReviewedFlashCards();
      return;
    }
    this.getNextIndex();
  }

  private submitReviewedFlashCards() {
    const reviewedFlashCards: FlashCardReviewedList[] = this.flashCards.map(card => ({
      id: card.id
    }));

    this.flashCardService.patchLastReviewedFlashCard(reviewedFlashCards).subscribe({
      next: () => {
        this.learnMoreDialog();
      }
    });
  }

  private learnMoreDialog() {
    const flashcardsLearned = this.flashCards.length;
    const subjectId = this.subjectId;
    const dialogRef = this.dialog.open(LearnMoreComponent, {
      minWidth: '400px',
      data: { flashcardsLearned, subjectId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.router.navigateByUrl('/subject/' + this.subjectId);
      } else {
        this.flashCards = [];
        this.index = 0;
        this.reviewedFlashCardIds = [];
        this.firstReview = false;
        this.loadData();
      }
    })
  }

  editFlashCard(flashCardId: number, index: number) {
    const returnEditedFlashCard = true;
    const dialogRef = this.dialog.open(AddFlashCardDialogComponent, {
      minWidth: "1000px",
      data: { flashCardId, returnEditedFlashCard }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.flashCards[index].question = result.question;
        this.flashCards[index].answer = result.answer;
      }
    });
  }

  async openConfirmDialog(id: number, index: number) {
    const cofirmed = await this.dialogService.confirm
      ("Delete this flash card?", "Are you sure you want to delete this flash card?");

    if (cofirmed) this.deleteFlashCard(id, index);
  }

  deleteFlashCard(id: number, index: number) {
    this.flashCardService.deleteFlashCard(id).subscribe({
      next: () => this.flashCards.splice(index, 1),
      error: error => console.error(error)
    });
  }
}
