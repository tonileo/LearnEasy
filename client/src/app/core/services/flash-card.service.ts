import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FlashCard } from '../../shared/models/flashCard';

@Injectable({
  providedIn: 'root'
})
export class FlashCardService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getFlashCards(){
    return this.http.get<FlashCard[]>(this.baseUrl + 'flashCard');
  }

  addFlashCard(subjectId: number, values: any){
    return this.http.post(this.baseUrl + 'flashCard?subjectId=' + subjectId, values);
  }
}