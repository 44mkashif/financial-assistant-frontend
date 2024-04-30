import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import {
  IAskQuestionApiResponse,
  IGetMessagesApiResponse,
} from '../shared/interfaces/chat.interface';
import { W2Form } from '../shared/interfaces/w2-form.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  askQuestion(
    question: string,
    w2Form: W2Form
  ): Observable<IAskQuestionApiResponse> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ` + localStorage.getItem('accessToken')
    );
    const payload = {
      question: question,
      gpt_assistant_id: w2Form?.gpt_assistant_id,
      gpt_thread_id: w2Form?.gpt_thread_id,
      w2_form_id: w2Form?.w2_form_id,
    };
    return this.http.post<IAskQuestionApiResponse>(
      `${environment.baseUrl}/chat/question`,
      payload,
      { headers }
    );
  }

  getMessages(threadId: string): Observable<IGetMessagesApiResponse> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ` + localStorage.getItem('accessToken')
    );
    return this.http.get<IGetMessagesApiResponse>(
      `${environment.baseUrl}/chat/messages/${threadId}`,
      { headers }
    );
  }
}
