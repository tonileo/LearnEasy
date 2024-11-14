import { Routes } from '@angular/router';
import { LibraryComponent } from './features/library/library.component';
import { SubjectComponent } from './features/subject/subject.component';
import { ProfileComponent } from './features/profile/profile.component';
import { StatsComponent } from './features/stats/stats.component';

export const routes: Routes = [
    { path: '', component: LibraryComponent },
    { path: 'library', redirectTo: '', pathMatch: 'full' },
    { path: 'subject/:id', component: SubjectComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'stats', component: StatsComponent }
];
