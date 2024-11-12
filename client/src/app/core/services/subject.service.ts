import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../../shared/models/subject';
import { SubjectCard } from '../../shared/models/subjectCard';
import { Category } from '../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllSubjects(){
    return this.http.get<SubjectCard[]>(this.baseUrl + 'subject')
  }

  getAllCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'subject/categories')
  }

  addSubject(values: any) {
    return this.http.post(this.baseUrl + 'subject', values);
  }

  getSubject(id: number){
    return this.http.get<Subject>(this.baseUrl + 'subject/' + id)
  }
}
