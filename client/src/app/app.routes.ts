import { Routes } from '@angular/router';
import { LibraryComponent } from './features/library/library.component';
import { SubjectComponent } from './features/subject/subject.component';
import { ProfileComponent } from './features/profile/profile.component';
import { StatsComponent } from './features/stats/stats.component';
import { LearnComponent } from './features/learn/learn.component';
import { TestErrorComponent } from './features/test-error/test-error.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { InternalErrorComponent } from './shared/components/internal-error/internal-error.component';

export const routes: Routes = [
    { path: '', component: LibraryComponent },
    { path: 'library', redirectTo: '', pathMatch: 'full' },
    { path: 'subject/:id', component: SubjectComponent },
    { path: 'subject/:id/learn', component: LearnComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'stats', component: StatsComponent },
    { path: 'test-error', component: TestErrorComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'internal-error', component: InternalErrorComponent },
    { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
