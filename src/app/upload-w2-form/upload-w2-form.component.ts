import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { FileService } from '../services/file.service';

@Component({
  selector: 'app-upload-w2-form',
  templateUrl: './upload-w2-form.component.html',
  styleUrl: './upload-w2-form.component.scss',
})
export class UploadW2FormComponent {
  isLoading = false;
  selectedFile: File | null = null;
  @Output() fileUploaded = new EventEmitter();

  constructor(
    private fileService: FileService,
    private toastr: ToastrService,
  ) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file.type !== 'application/pdf') {
      this.toastr.error('Only PDF files are accepted.', 'Error');
      return;
    }
    this.selectedFile = file;
  }

  onSubmit() {
    if (!this.selectedFile) {
      this.toastr.error('Please select a file first.', 'Error');
      return;
    }
    if (this.selectedFile) {
      this.isLoading = true;
      this.fileService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          this.toastr.success('File uploaded successfully!', 'Success');
          this.fileUploaded.emit();
          this.isLoading = false;
          this.selectedFile = null;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error('Error uploading file. Please try again.', 'Error');
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
