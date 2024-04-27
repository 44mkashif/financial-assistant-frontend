import { Component } from '@angular/core';
import { FileService } from '../services/file.service';
import { W2Form, W2FormListResponse } from '../shared/interfaces/w2-form.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  w2Forms: W2Form[] = [];
  userId: number = 1; //TODO: After implementing auth, fix this
  selectedIndex: number = 0;

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
    this.userId = 1;
    this.fetchW2Forms();
  }

  fetchW2Forms() {
    this.fileService.getFilesList(this.userId).subscribe(
      (response: W2FormListResponse) => {
        this.w2Forms = response.data;
        this.selectedIndex = 0;
      },
      error => {
        console.error('Error fetching W2 forms', error);
      }
    );
  }

  selectW2Form(index: number) {
    this.selectedIndex = index;
    console.log("selected", this.w2Forms[index])
  }

  handleFileUploaded() {
    this.fetchW2Forms();
  }
}
