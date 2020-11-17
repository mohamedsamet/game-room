import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserInterface } from './interfaces/user-interface/user.interface';
import { UserService } from './services/user.service';
import { environment } from '../environments/environment';
import { RoomsComponent } from './rooms/rooms.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomsComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [
    {provide: 'UserInterface', useClass: UserService},
    {provide: 'API_BASE_URL', useValue: environment.baseUrl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
