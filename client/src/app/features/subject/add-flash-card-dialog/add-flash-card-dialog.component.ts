import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlashCardService } from '../../../core/services/flash-card.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tag } from '../../../shared/models/tag';
import { TagService } from '../../../core/services/tag.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-flash-card-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButton,
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './add-flash-card-dialog.component.html',
  styleUrl: './add-flash-card-dialog.component.scss'
})
export class AddFlashCardDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<AddFlashCardDialogComponent>);
  private fb = inject(FormBuilder);
  private flashCardService = inject(FlashCardService);
  private tagService = inject(TagService);
  public matDialogData = inject(MAT_DIALOG_DATA);
  public addTagInput: boolean = false;
  public tags?: Tag[] = [];

  addFlashCardForm = this.fb.group({
    question: [''],
    answer: [''],
    tagId: [null as number | null]
  })

  addTagForm = this.fb.group({
    name: ['']
  })

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.tagService.getTags().subscribe({
      next: response => this.tags = response,
      error: error => console.error(error)
    });

    if (this.matDialogData.flashCardId){
      this.flashCardService.getFlashCard(this.matDialogData.flashCardId).subscribe({
        next: result => {
          this.addFlashCardForm.get('question')?.setValue(result.question);
          this.addFlashCardForm.get('answer')?.setValue(result.answer);
          this.addFlashCardForm.get('tagId')?.setValue(result.tagId);
        }
      })
    }
  }

  addTagInterface() {
    this.addTagInput = true;
  }

  createTag() {
    this.addTagInput = false;
    const tagName = this.addTagForm.get('name')?.value;
    if (tagName) {
      this.tagService.createTag(tagName).subscribe({
        next: (newTag: Tag) => {
          this.loadData();
          this.addFlashCardForm.patchValue({
            tagId: newTag.id
          });
        },
        error: error => console.error(error)
      });
    }
  }

  addFlashCard() {
    const subjectId = this.matDialogData.subjectId;
    this.flashCardService.addFlashCard(subjectId, this.addFlashCardForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: error => console.error(error)
    });
  }

  editFlashCard() {
    const flashCardId = this.matDialogData.flashCardId;
    const returnEditedFlashCard = this.matDialogData.returnEditedFlashCard;
    this.flashCardService.editFlashCard(flashCardId, this.addFlashCardForm.value).subscribe({
      next: () => {
        returnEditedFlashCard ? this.dialogRef.close(this.addFlashCardForm.value) : this.dialogRef.close(true);
      },
      error: error => console.error(error)
    });
  }
}
