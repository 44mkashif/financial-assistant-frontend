import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { UploadW2FormComponent } from './upload-w2-form/upload-w2-form.component';
import { W2FormDetailsComponent } from './w2-form-details/w2-form-details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FilesListComponent } from './files-list/files-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    UploadW2FormComponent,
    W2FormDetailsComponent,
    FilesListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MatIconModule],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
