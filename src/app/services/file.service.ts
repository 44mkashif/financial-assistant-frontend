import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { W2FormListResponse } from '../shared/interfaces/w2-form.interface';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ` + localStorage.getItem('accessToken')
    );
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${environment.baseUrl}/w2-form/upload`, formData, { headers });
  }

  getFilesList(): Observable<W2FormListResponse> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ` + localStorage.getItem('accessToken')
    );
    return this.http.get<W2FormListResponse>(
      `${environment.baseUrl}/w2-form/list`,
      { headers }
    );
  }
}
