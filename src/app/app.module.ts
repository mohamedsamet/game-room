import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UserInterface } from './interfaces/user-interface/user.interface';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, FormsModule
  ],
  providers: [
    {provide: 'UserInterface', useClass: UserService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
