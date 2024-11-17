import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SubjectCard } from '../../shared/models/subjectCard';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddSubjectDialogComponent } from './add-subject-dialog/add-subject-dialog.component';
import { LibraryService } from '../../core/services/library.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatDialogModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit {
  private libraryService = inject(LibraryService);
  readonly dialog = inject(MatDialog);
  subjectCards: SubjectCard[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.libraryService.getAllSubjects().subscribe({
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
        this.loadData();
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
        this.loadData();
      }
    });
  }
}
