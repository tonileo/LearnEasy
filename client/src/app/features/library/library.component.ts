import { Component, inject, OnInit } from '@angular/core';
import { SubjectService } from '../../core/services/subject.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit{
  private subjectService = inject(SubjectService);
  subjects: string[] = [];
  
  
  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe({
      next: response => this.subjects = response,
      error: error => console.error(error)
    });
  }
}
