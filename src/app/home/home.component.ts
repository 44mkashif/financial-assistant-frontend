import { ChangeDetectorRef, Component } from '@angular/core';
import { FileService } from '../services/file.service';
import {
  W2Form,
  W2FormListResponse,
} from '../shared/interfaces/w2-form.interface';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  w2Forms: W2Form[] = [];
  selectedIndex: number = 0;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private fileService: FileService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.fetchW2Forms();
  }

  fetchW2Forms() {
    this.fileService.getFilesList().subscribe(
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

  onLogout() {
    this.authService.logout().subscribe(
      (response) => {
        localStorage.removeItem('accessToken');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }
}
