import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Category } from '../../../shared/models/category';
import { LibraryService } from '../../../core/services/library.service';
import { SubjectService } from '../../../core/services/subject.service';

@Component({
  selector: 'app-add-subject-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButton,
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './add-subject-dialog.component.html',
  styleUrl: './add-subject-dialog.component.scss'
})
export class AddSubjectDialogComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<AddSubjectDialogComponent>);
  private fb = inject(FormBuilder);
  private libraryService = inject(LibraryService);
  private subjectService = inject(SubjectService);
  categories: Category[] = [];

  addSubjectForm = this.fb.group({
    name: [''],
    categoryId: [''],
    color: ['']
  })

  ngOnInit(): void {
    this.libraryService.getAllCategories().subscribe({
      next: result => this.categories = result,
      error: error => console.error(error)
    });
  }

  onSubmit() {
    this.subjectService.addSubject(this.addSubjectForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: error => console.error(error)
    });
  }
}
