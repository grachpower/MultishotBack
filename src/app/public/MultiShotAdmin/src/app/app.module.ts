import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CameraViewsComponent } from "./camera-views/camera-views.component";
import { SocketService } from "./services/socket/socket.service";
import { MainApiService } from "./services/main-api/main-api.service";
import { BackendService } from "./services/backend/backend.service";
import { CameraControlsComponent } from "./camera-controls/camera-controls.component";
import { HttpClientModule } from "@angular/common/http";
import {MdButtonModule, MdCardModule} from "@angular/material";


@NgModule({
  declarations: [
    AppComponent,
    CameraViewsComponent,
    CameraControlsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MdCardModule,
    MdButtonModule,
  ],
  providers: [
    SocketService,
    MainApiService,
    BackendService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
