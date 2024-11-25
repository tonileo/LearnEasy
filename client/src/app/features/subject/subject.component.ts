import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { SubjectService } from '../../core/services/subject.service';
import { Subject } from '../../shared/models/subject';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddFlashCardDialogComponent } from './add-flash-card-dialog/add-flash-card-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { DialogService } from '../../core/services/dialog.service';
import { FlashCardService } from '../../core/services/flash-card.service';

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
  private dialogService = inject(DialogService);
  private flashCardService = inject(FlashCardService);
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
    const subjectId = this.subjectId;
    const dialogRef = this.dialog.open(AddFlashCardDialogComponent, {
      minWidth: "1000px",
      data: {subjectId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.loadSubject();
      }
    });
  }

  editFlashCardDialog(flashCardId: number): void {
    console.log(flashCardId);
    const dialogRef = this.dialog.open(AddFlashCardDialogComponent, {
      minWidth: "1000px",
      data: {flashCardId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.loadSubject();
      }
    });
  }

  async openConfirmDialog(id: number){
    const confirmed = await this.dialogService.confirm(
      'Delete flashcard', 'Are you sure you want to delete this flashcard?'
    )
    if(confirmed) this.deleteFlashcard(id);
  }

  deleteFlashcard(id: number){
    this.flashCardService.deleteFlashCard(id).subscribe({
      next: () => this.loadSubject(),
      error: error => console.error(error)
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

  redirectToLearn(): void {
    this.router.navigateByUrl('/subject/' + this.subjectId + '/learn');
  }
}
