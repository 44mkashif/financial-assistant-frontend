import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import {
  ILoginApiResponse,
  ISignUpApiResponse,
  ISignUpPayload,
} from '../shared/interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(payload: ISignUpPayload): Observable<ISignUpApiResponse> {
    return this.http.post<ISignUpApiResponse>(
      `${environment.baseUrl}/auth/signup`,
      payload
    );
  }

  login(email: string, password: string): Observable<ILoginApiResponse> {
    return this.http.post<ILoginApiResponse>(
      `${environment.baseUrl}/auth/login`,
      { email, password }
    );
  }

  logout(): Observable<ILoginApiResponse> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ` + localStorage.getItem('accessToken')
    );
    return this.http.post<ILoginApiResponse>(
      `${environment.baseUrl}/auth/logout`,
      {},
      { headers }
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') != null;
  }
}
