import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import {RedisService} from './services/redis.service';


import {APP_ROUTING} from './app.routes';
import { LoginComponent } from './components/login/login.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PhotosComponent } from './components/photos/photos.component';
import { UploadComponent } from './components/upload/upload.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TimelineComponent,
    PhotosComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    APP_ROUTING
  ],
  providers: [
    RedisService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
