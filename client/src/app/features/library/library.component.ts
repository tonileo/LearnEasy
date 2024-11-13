import { Component, inject, OnInit } from '@angular/core';
import { SubjectService } from '../../core/services/subject.service';
import { MatButton } from '@angular/material/button';
import { SubjectCard } from '../../shared/models/subjectCard';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddSubjectDialogComponent } from './add-subject-dialog/add-subject-dialog.component';
import { LibraryService } from '../../core/services/library.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatDialogModule
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit{
  private libraryService = inject(LibraryService)
  private subjectService = inject(SubjectService);
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

  addNewSubject(): void {
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }
}
