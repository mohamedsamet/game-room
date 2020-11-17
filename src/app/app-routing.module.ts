import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoomsComponent } from './rooms/rooms.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'rooms/:pseudo',
    component: RoomsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
