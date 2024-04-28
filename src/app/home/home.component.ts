import { ChangeDetectorRef, Component } from '@angular/core';
import { FileService } from '../services/file.service';
import {
  W2Form,
  W2FormListResponse,
} from '../shared/interfaces/w2-form.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  w2Forms: W2Form[] = [];
  userId: number = 1; //TODO: After implementing auth, fix this
  selectedIndex: number = 0;

  constructor(
    private fileService: FileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    //TODO: After implementing auth, fix this
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userId = +userId;
    }
    localStorage.setItem('userId', this.userId.toString());
    this.fetchW2Forms();
  }

  fetchW2Forms() {
    this.fileService.getFilesList(this.userId).subscribe(
      (response: W2FormListResponse) => {
        if (response.data.length) {
          this.w2Forms = response.data;
          this.selectW2Form(0);
        }
      },
      (error) => {
        console.error('Error fetching W2 forms', error);
      }
    );
  }

  selectW2Form(index: number) {
    this.selectedIndex = index;
    this.cdr.detectChanges();
  }
}
