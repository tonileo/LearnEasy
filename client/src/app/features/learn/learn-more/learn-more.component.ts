import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FlashCardService } from '../../../core/services/flash-card.service';

@Component({
  selector: 'app-learn-more',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './learn-more.component.html',
  styleUrl: './learn-more.component.scss'
})
export class LearnMoreComponent implements OnInit{
  private dialogRef = inject(MatDialogRef<LearnMoreComponent>);
  public matDialogData = inject(MAT_DIALOG_DATA);
  private flashCardService = inject(FlashCardService);

  public flashCardsCount: number = 0;

  ngOnInit(): void {
    const subjectId = this.matDialogData.subjectId
    this.flashCardService.getSubjectFlashCardsCount(subjectId).subscribe({
      next: result => this.flashCardsCount = result,
      error: error => console.error(error),
    });
  }

  closeDialog(){
    this.dialogRef.close(true);
  }

  learnMore(){
    this.dialogRef.close();
  }
}
