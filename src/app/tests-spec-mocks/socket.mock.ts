import { Observable, of } from 'rxjs';
import { UserInRoomResultModel } from '../models/user/user-in-room-result.model';
import { UserModel } from '../models/user/user.model';
import { RoomsResultModel } from '../models/room/rooms-result.model';
import { RoomsHelper } from './helpers/room.service.spec.helper';
import {ChatModel} from "../models/chat/chat.model";
import {UserWriterStatusModel} from "../models/user/user-writer-status.model";

export class SocketMock {
  public executeCallBackTree: {fn: Function, topic: string}[] = [];
  on(eventName: string, callback: Function) {
    this.executeCallBackTree.push({fn: callback, topic: eventName});
  }

  emit(event: string, val: string) {
    const eventFn = this.executeCallBackTree.find(call => call.topic === event);
    eventFn ? eventFn.fn() : null;
  }

  fromEvent(event: string): Observable<any> {
    if (event === 'getUsersInRoom') {
      return this.getUserInRoom();
    } else if (event === 'getRooms') {
      return this.getRooms();
    } else if (event === 'getChatMessagesInRoom') {
      return this.getChatMsg()
    } else if (event === 'getWritersInRoom') {
      return this.getWriterStatus();
    }
    return of()
  }

  getWriterStatus() {
    const writerStatus1 = {
      pseudo: 'samet',
      roomId: '123456',
      status: true,
      _id: '456456'
    } as UserWriterStatusModel;

    const writerStatus2 = {
      pseudo: 'yasmine',
      roomId: '564564',
      status: true,
      _id: '33333'
    } as UserWriterStatusModel;
    return of([writerStatus1, writerStatus2]);
  }

  getChatMsg(): Observable<ChatModel> {
    return of({
      pseudo: 'samet',
        userId: '123456',
        message: 'message',
        dateTimeParsed: '03:55'
    });
  }

  getUserInRoom() {
    const usersInRoom = {} as UserInRoomResultModel;
    const user: UserModel = {_id: '8888', pseudo: 'samet'}
    usersInRoom.roomId = 'zerzer';
    usersInRoom.users = [user];
    return of(usersInRoom);
  }

  getRooms() {
    const usersInRoom = {} as RoomsResultModel;
    usersInRoom.total = 1;
    usersInRoom.rooms = [new RoomsHelper().room2];
    return of(usersInRoom);
  }
}
