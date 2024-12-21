import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  createOrder(values: any) {
    return this.http.post(this.baseUrl + 'order', values);
  }
}