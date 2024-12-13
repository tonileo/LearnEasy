import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AccountService } from '../../core/services/account.service';
import { User } from '../../shared/models/user';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatLabel,
    MatInput,
    MatFormField,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  private fb = inject(FormBuilder);
  private snackbarService = inject(SnackbarService);
  private accountService = inject(AccountService);
  
  public user: User | null = null;
  public enableBtn: boolean = false;

  editForm = this.fb.group({
    firstName: [''],
    lastName: ['']
  });

  ngOnInit(): void {
    this.user = this.accountService.currentUser();
    this.editForm.patchValue({
      firstName: this.user?.firstName,
      lastName: this.user?.lastName
    })

    this.editForm.valueChanges.subscribe(() => {
      this.enableBtn = this.editForm.valid;
    });
  }

  onSubmit(){
    this.accountService.editUser(this.editForm.value).subscribe({
      next: () => {
          this.accountService.getUserInfo();
          this.snackbarService.success('Successfully edited values');
        } 
    });
  }
}
