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
export class AddFlashCardDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<AddFlashCardDialogComponent>);
  private fb = inject(FormBuilder);
  private flashCardService = inject(FlashCardService);
  private tagService = inject(TagService);
  public subjectId = inject(MAT_DIALOG_DATA);
  public addTagInput: boolean = false;
  public tags?: Tag[] = [];

  addFlashCardForm = this.fb.group({
    question: [''],
    answear: [''],
    tagId: 0
  })

  addTagForm = this.fb.group({
    name: ['']
  })

  loadData() {
    this.tagService.getTags().subscribe({
      next: response => this.tags = response,
      error: error => console.error(error)
    });
  }

  ngOnInit(): void {
    this.loadData();
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

  onSubmit() {
    this.flashCardService.addFlashCard(this.subjectId, this.addFlashCardForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: error => console.error(error)
    });
  }

}
