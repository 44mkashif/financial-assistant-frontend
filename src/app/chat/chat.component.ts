import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';
import {
  AskQuestionApiResponse,
  ChatMessage,
  GetMessagesApiResponse,
} from '../shared/interfaces/chat.interface';
import { W2Form } from '../shared/interfaces/w2-form.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnChanges {
  message: string = '';
  isLoading: boolean = false;
  isTyping: boolean = false;
  messages: ChatMessage[] = [];
  @Input() w2Form?: W2Form;
	@ViewChild('scrollBottom') private myScrollContainer!: ElementRef;
  
  initialMessage: ChatMessage = {
    role: 'system',
    message: 'Hello! I’m here to help you. Feel free to ask any questions you might have.'
  };

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messages = [this.initialMessage];
    this.fetchMessages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['w2Form'] && !changes['w2Form'].firstChange) {
      this.fetchMessages();
    }
  }

  sendMessage(): void {
    if (this.message !== '' && this.w2Form) {
      const now = new Date();
      this.messages.push({
        role: 'user',
        message: this.message,
        created_at: now.toISOString(),
      });
      this.isTyping = true;

      this.chatService
        .askQuestion(this.message, this.w2Form)
        .subscribe(
          (response: AskQuestionApiResponse) => {
            this.isTyping = false;
            this.messages.push({
              role: 'system',
              message: response.data.message,
              created_at: response.data.created_at,
            });
            this.scrollToBottom();
          },
          (error) => {
            this.isTyping = false;
            console.error('Error asking question:', error);
            const now = new Date();
            this.messages.push({
              role: 'system',
              message: 'Something went wrong! Please try again',
              created_at: now.toISOString(),
            });
            this.scrollToBottom();
          }
        );
      this.message = '';
    }
  }

  fetchMessages() {
    if (this.w2Form && this.w2Form.gpt_thread_id) {
      this.isLoading = true;
      this.chatService
        .getMessages(this.w2Form.gpt_thread_id)
        .subscribe((response: GetMessagesApiResponse) => {
          this.messages = [this.initialMessage, ...response.data];
          this.isLoading = false;
          this.scrollToBottom();
        });
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.myScrollContainer.nativeElement.scroll({
        top: this.myScrollContainer.nativeElement.scrollHeight + 1000,
        behavior: 'smooth',
      });
    }, 100);
	}
}
