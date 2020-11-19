import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggedUserInterface } from './interfaces/user/logged-user.interface';
import { UserService } from './services/user/user.service';
import { environment } from '../environments/environment';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert/alert.service';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { UtiliesService } from './services/utilies.service';
import { AuthorizationAppendInterceptor } from './interceptors/authorization-append.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationAppendInterceptor, multi: true},
    {provide: 'LoggedUserInterface', useClass: UserService},
    {provide: 'AddUserInterface', useClass: UserService},
    {provide: 'DisconnectionInterface', useClass: UserService},
    {provide: 'RedirectionInterface', useClass: UtiliesService},
    {provide: 'AlertInterface', useClass: AlertService},
    {provide: 'API_BASE_URL', useValue: environment.baseUrl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
