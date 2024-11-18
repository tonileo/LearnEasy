import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getTags(){
    return this.http.get<Tag[]>(this.baseUrl + 'tag');
  }

  createTag(tagName: string){
    return this.http.post<Tag>(this.baseUrl + 'tag?tagName=' + tagName, {});
  }
}
