import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AskQuestionApiResponse, GetMessagesApiResponse } from '../shared/interfaces/chat.interface';
import { W2Form } from '../shared/interfaces/w2-form.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  askQuestion(question: string, w2Form: W2Form): Observable<AskQuestionApiResponse> {
    const payload = {
      question: question,
      user_id: localStorage.getItem('userId'),
      gpt_assistant_id: w2Form?.gpt_assistant_id,
      gpt_thread_id: w2Form?.gpt_thread_id,
      w2_form_id: w2Form?.w2_form_id
    };
    return this.http.post<AskQuestionApiResponse>(`${environment.baseUrl}/chat/question`, payload);
  }

  getMessages(threadId: string): Observable<GetMessagesApiResponse> {
    return this.http.get<GetMessagesApiResponse>(`${environment.baseUrl}/chat/messages/${threadId}`);
  }
}
