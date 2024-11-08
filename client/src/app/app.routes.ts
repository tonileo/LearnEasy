import { Routes } from '@angular/router';
import { LibraryComponent } from './features/library/library.component';
import { SubjectComponent } from './features/subject/subject.component';

export const routes: Routes = [
    {path: '', component:LibraryComponent},
    {path: 'subject', component:SubjectComponent}
];
