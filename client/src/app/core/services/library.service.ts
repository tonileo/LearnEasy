import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SubjectCard } from '../../shared/models/subjectCard';
import { Category } from '../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllSubjects(){
    return this.http.get<SubjectCard[]>(this.baseUrl + 'library');
  }

  getAllSubjectsByCategory(categoryId: number){
    return this.http.get<SubjectCard[]>(this.baseUrl + 'library?categoryId=' + categoryId);
  }

  getAllCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'library/categories');
  }
}
