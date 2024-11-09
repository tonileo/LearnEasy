import { Component, inject, OnInit } from '@angular/core';
import { SubjectService } from '../../core/services/subject.service';
import { MatButton } from '@angular/material/button';
import { SubjectCard } from '../../shared/models/subjectCard';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit{
  private subjectService = inject(SubjectService);
  subjectCards: SubjectCard[] = [];
  
  
  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe({
      next: response => this.subjectCards = response,
      error: error => console.error(error)
    });
  }

  addNewSubject(): void {

  }
}
