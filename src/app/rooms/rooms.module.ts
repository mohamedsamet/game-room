import { NgModule } from '@angular/core';
import { RoomsComponent } from './rooms.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { RoomsService } from '../services/rooms/rooms.service';
import { environment } from '../../environments/environment';
import { RoomsRoutingModule } from './rooms-routing.module';

@NgModule({
  declarations: [
    RoomsComponent,
    CreateRoomComponent,
    RoomsListComponent
  ],
  imports: [RoomsRoutingModule],
  providers: [
    {provide: 'AddRoomInterface', useClass: RoomsService},
    {provide: 'GetRoomsInterface', useClass: RoomsService},
    {provide: 'API_BASE_URL', useValue: environment.baseUrl}
  ]
})
export class RoomsModule { }
