import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../../shared/models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getSubject(id: number){
    return this.http.get<Subject>(this.baseUrl + 'subject/' + id)
  }

  addSubject(values: any) {
    return this.http.post(this.baseUrl + 'subject', values);
  }

  editSubject(subjectId: number, values: any) {
    return this.http.put(this.baseUrl + 'subject/' + subjectId, values)
  }

  deleteSubject(id: number){
    return this.http.delete(this.baseUrl + 'subject/' + id)
  }
}
