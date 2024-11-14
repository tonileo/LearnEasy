import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlashCardDialogComponent } from './add-flash-card-dialog.component';

describe('AddFlashCardDialogComponent', () => {
  let component: AddFlashCardDialogComponent;
  let fixture: ComponentFixture<AddFlashCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFlashCardDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFlashCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
