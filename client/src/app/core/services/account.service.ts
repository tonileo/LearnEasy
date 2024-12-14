import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { Payment } from '../../shared/models/payment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  
  currentUser = signal<User | null>(null);
  payment = signal<Payment | null>(null);

  login(values: any) {
    let params = new HttpParams();
    params = params.append('useCookies', true);
    return this.http.post<User>(this.baseUrl + 'login', values, {params});
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values);
  }

  getUserInfo() {
    return this.http.get<User>(this.baseUrl + 'account/user-info').subscribe({
      next: user => this.currentUser.set(user)
    });
  }

  logout(){
    return this.http.post(this.baseUrl + 'account/logout', {});
  }

  getAuthState(){
    return this.http.get<{isAuthenticated: boolean}>(this.baseUrl + 'account/auth-status');
  }

  editUser(values: any){
    return this.http.put(this.baseUrl + 'account', values);
  }

  upgradeToPremium() {
    return this.http.patch(this.baseUrl + 'account/premium', {});
  }
}
