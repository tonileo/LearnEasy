import { Component, inject, OnInit } from '@angular/core';
import { SubjectService } from '../../core/services/subject.service';
import { Subject } from '../../shared/models/subject';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddFlashCardDialogComponent } from './add-flash-card-dialog/add-flash-card-dialog.component';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatDialogModule
  ],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent implements OnInit {
  private subjectService = inject(SubjectService);
  private activatedRoute = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);

  subject?: Subject;
  subjectId?: string | null;

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
    if (this.subjectId) {
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
  }
}
