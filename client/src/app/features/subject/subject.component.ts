import { Component, inject, OnInit } from '@angular/core';
import { SubjectService } from '../../core/services/subject.service';
import { Subject } from '../../shared/models/subject';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent implements OnInit{
  private subjectService = inject(SubjectService);
  subjects: string[] = [];
  
  
  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe({
      next: response => this.subjects = response,
      error: error => console.error(error)
    });
  }

  addNewFlashCard(): void {
    
  }

}
