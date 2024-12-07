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

  getFlashCard(flashCardId: number){
    return this.http.get<FlashCard>(this.baseUrl + 'flashCard/' + flashCardId);
  }

  getSubjectFlashCardsCount(id: number){
    return this.http.get<number>(this.baseUrl + 'flashCard/subject/' + id);
  }

  addFlashCard(subjectId: number, values: any){
    return this.http.post(this.baseUrl + 'flashCard?subjectId=' + subjectId, values);
  }

  editFlashCard(flashCardId: number, values: any){
    return this.http.put(this.baseUrl + 'flashCard?flashCardId=' + flashCardId, values);
  }

  deleteFlashCard(id: number){
    return this.http.delete(this.baseUrl + 'flashCard/' + id);
  }

  getRandomFlashCards(id: number){
    return this.http.get<FlashCard[]>(this.baseUrl + 'flashCard/learn/' + id);
  }

  patchLastReviewedFlashCard(values: any){
    return this.http.patch(this.baseUrl + 'flashCard/learn', values);
  }
}
