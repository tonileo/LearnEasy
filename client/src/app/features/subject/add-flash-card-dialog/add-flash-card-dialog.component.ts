import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlashCardService } from '../../../core/services/flash-card.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-flash-card-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButton,
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './add-flash-card-dialog.component.html',
  styleUrl: './add-flash-card-dialog.component.scss'
})
export class AddFlashCardDialogComponent {
  private dialogRef = inject(MatDialogRef<AddFlashCardDialogComponent>);
  private fb = inject(FormBuilder);
  private flashCardService = inject(FlashCardService);
  public subjectId = inject(MAT_DIALOG_DATA);


  addFlashCardForm = this.fb.group({
    question: [''],
    answear: ['']
  })

  onSubmit() {
    this.flashCardService.addFlashCard(this.subjectId, this.addFlashCardForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: error => console.error(error)
    });
  }

}
