import { NgModule } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';
import { CreateRoomComponent } from './rooms/create-room/create-room.component';
import { RoomsService } from '../services/rooms/rooms.service';
import { environment } from '../../environments/environment';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketRoomService } from '../services/rooms/socket-room.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { PaginatorComponent } from '../paginator/paginator.component';
import { RoomComponent } from './rooms/room/room.component';
import { HomeComponent } from './home.component';
import { UserInRoomComponent } from './rooms/user-in-room/user-in-room.component';
import { ChatBoxComponent } from './rooms/room/chat-box/chat-box.component';
import {ChatService} from "../services/chat/chat.service";

const config: SocketIoConfig = { url: environment.socketUrl, options: {transports: ['websocket', 'polling', 'flashsocket']} };

@NgModule({
  declarations: [
    PaginatorComponent,
    RoomsComponent,
    CreateRoomComponent,
    RoomsListComponent,
    RoomComponent,
    HomeComponent,
    UserInRoomComponent,
    ChatBoxComponent
  ],
  imports: [
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {provide: 'EmitRoomsNotifInterface', useClass: SocketRoomService},
    {provide: 'GetRoomsNotifInterface', useClass: SocketRoomService},
    {provide: 'GetUsersInRoomNotifInterface', useClass: SocketRoomService},
    {provide: 'AddRoomInterface', useClass: RoomsService},
    {provide: 'ManageRoomsInterface', useClass: RoomsService},
    {provide: 'RoomAccessInterface', useClass: RoomsService},
    {provide: 'SendMessageInterface', useClass: ChatService},
    {provide: 'API_BASE_URL', useValue: environment.baseUrl}
  ]
})
export class HomeModule { }
