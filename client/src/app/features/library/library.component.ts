import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SubjectCard } from '../../shared/models/subjectCard';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddSubjectDialogComponent } from './add-subject-dialog/add-subject-dialog.component';
import { LibraryService } from '../../core/services/library.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from '../../core/services/dialog.service';
import { SubjectService } from '../../core/services/subject.service';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit {
  private libraryService = inject(LibraryService);
  private dialogService = inject(DialogService);
  private subjectService = inject(SubjectService);
  readonly dialog = inject(MatDialog);

  subjectCards: SubjectCard[] = [];
  public categories: Category[] = [];

  ngOnInit(): void {
    this.loadSubjects();

    this.libraryService.getAllCategories().subscribe({
      next: response => this.categories = response,
      error: error => console.error(error)
    })
  }

  loadSubjects(): void {
    this.libraryService.getAllSubjects().subscribe({
      next: response => this.subjectCards = response,
      error: error => console.error(error)
    });
  }

  onCategoryChange(event: any) {
    const categoryId = event.value;

    if (!categoryId) this.loadSubjects();
    this.libraryService.getAllSubjectsByCategory(categoryId).subscribe({
      next: response => this.subjectCards = response,
      error: error => console.error(error)
    });
  }

  addNewSubjectDialog(): void {
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSubjects();
      }
    });
  }

  editSubjectDialog(subjectId: number, subjectName: string, subjectCategoryName: string, subjectColor: string): void {
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      width: '500px',
      data: { subjectId, subjectName, subjectCategoryName, subjectColor }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSubjects();
      }
    });
  }

  async openConfirmDialog(id: number){
    const confirmed = await this.dialogService.confirm(
      'Delete subject', 'Are you sure you want to delete this subject?'
    )
    if(confirmed) this.deleteSubject(id);
  }

  deleteSubject(id: number){
    this.subjectService.deleteSubject(id).subscribe({
      next: () => this.loadSubjects(),
      error: error => console.error(error)
    });
  }
}
