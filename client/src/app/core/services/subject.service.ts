import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../../shared/models/subject';
import { SubjectCard } from '../../shared/models/subjectCard';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllSubjects(){
    return this.http.get<SubjectCard[]>(this.baseUrl + 'subject')
  }

  getSubject(id : number){
    return this.http.get<Subject>(this.baseUrl + 'subject/' + id)
  }
}
