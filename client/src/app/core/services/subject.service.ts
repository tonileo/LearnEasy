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

  getAllSubjects(){
    return this.http.get<string[]>(this.baseUrl + 'subject')
  }
}
