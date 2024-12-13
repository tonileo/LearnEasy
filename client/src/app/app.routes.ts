import { Routes } from '@angular/router';
import { LibraryComponent } from './features/library/library.component';
import { SubjectComponent } from './features/subject/subject.component';
import { ProfileComponent } from './features/profile/profile.component';
import { LearnComponent } from './features/learn/learn.component';
import { TestErrorComponent } from './features/test-error/test-error.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { InternalErrorComponent } from './shared/components/internal-error/internal-error.component';
import { LoginComponent } from './features/account/login/login.component';
import { RegisterComponent } from './features/account/register/register.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LibraryComponent, canActivate: [authGuard]},
    { path: 'library', redirectTo: '', pathMatch: 'full', canActivate: [authGuard]},
    { path: 'subject/:id', component: SubjectComponent, canActivate: [authGuard]},
    { path: 'subject/:id/learn', component: LearnComponent, canActivate: [authGuard]},
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
    { path: 'account/login', component: LoginComponent },
    { path: 'account/register', component: RegisterComponent },
    { path: 'test-error', component: TestErrorComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'internal-error', component: InternalErrorComponent },
    { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
