import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubjectDialogComponent } from './add-subject-dialog.component';

describe('AddSubjectDialogComponent', () => {
  let component: AddSubjectDialogComponent;
  let fixture: ComponentFixture<AddSubjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSubjectDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
