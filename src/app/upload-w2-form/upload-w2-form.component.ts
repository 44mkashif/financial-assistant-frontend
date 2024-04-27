import { Component, EventEmitter, Output } from '@angular/core';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-upload-w2-form',
  templateUrl: './upload-w2-form.component.html',
  styleUrl: './upload-w2-form.component.scss'
})
export class UploadW2FormComponent {
  selectedFile: File | null = null;
  @Output() fileUploaded = new EventEmitter();

  constructor(private fileService: FileService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe(
        response => {
          console.log('File uploaded successfully', response);
          this.fileUploaded.emit();
        },
        error => {
          console.error('Error uploading file', error);
        }
      );
    }
  }
  
  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.add('dragover');
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.remove('dragover');
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.remove('dragover');
    this.selectedFile = event.dataTransfer.files[0];
  }
}
