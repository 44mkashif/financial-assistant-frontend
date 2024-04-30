import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { AppRoutingModule } from './app-routing.module';
import { FilesListComponent } from './files-list/files-list.component';
import { UploadW2FormComponent } from './upload-w2-form/upload-w2-form.component';
import { W2FormDetailsComponent } from './w2-form-details/w2-form-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadW2FormComponent,
    W2FormDetailsComponent,
    FilesListComponent,
    ChatComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      preventDuplicates: true,
    }),
    MatProgressSpinnerModule,
    FormsModule,
		ReactiveFormsModule
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
