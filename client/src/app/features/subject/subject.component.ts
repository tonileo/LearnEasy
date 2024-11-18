import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { SubjectService } from '../../core/services/subject.service';
import { Subject } from '../../shared/models/subject';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddFlashCardDialogComponent } from './add-flash-card-dialog/add-flash-card-dialog.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [
    MatButton,
    MatIconModule,
    MatDialogModule,
    MatMenuModule
  ],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  readonly dialog = inject(MatDialog);
  private router = inject(Router);
  private subjectService = inject(SubjectService);
  private activatedRoute = inject(ActivatedRoute);

  subject?: Subject;
  subjectId: string | null = null;

  ngOnInit(): void {
    this.loadSubject();
  }

  loadSubject() {
    this.subjectId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!this.subjectId) return;

    this.subjectService.getSubject(+this.subjectId).subscribe({
      next: response => this.subject = response,
      error: error => console.error(error)
    });
  }

  addNewFlashCardDialog(): void {
    const dialogRef = this.dialog.open(AddFlashCardDialogComponent, {
      width: "500px",
      data: this.subjectId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.loadSubject();
      }
    });
  }

  scrollLeft(): void {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({ left: -250, behavior: 'smooth' });
  }

  scrollRight(): void {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({ left: 250, behavior: 'smooth' });
  }
}
