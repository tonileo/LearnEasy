import { Component, inject, OnInit } from '@angular/core';
import { SubjectService } from '../../core/services/subject.service';
import { Subject } from '../../shared/models/subject';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

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
  private activatedRoute = inject(ActivatedRoute);
  subject?: Subject
  
  ngOnInit(): void {
    this.loadSubject();
  }

  loadSubject() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    if(!id) return;

    this.subjectService.getSubject(+id).subscribe({
      next: response => this.subject = response,
      error: error => console.error(error)
    });
  }

  addNewFlashCard(): void {
    
  }
}
