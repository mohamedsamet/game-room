import { TestBed } from '@angular/core/testing';
import {SocketRoomService} from "./socket-room.service";
import {Socket} from "ngx-socket-io";
import {RedirectionInterface} from "../../interfaces/utilities/redirection/redirection.interface";
import {DataInterface} from "../../interfaces/utilities/data.interface";
import {Subject} from "rxjs";
import {LOCAL_STORAGE_ID} from "../../constants/rooms.constant";

describe('SocketRoomsService', () => {
  let socketRoomsService: SocketRoomService;
  let socket: Socket;
  let redirect: RedirectionInterface;
  let dataInt: DataInterface;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: Socket, useClass: SocketMock},
        {provide: 'RedirectionInterface', useClass: RedirectionInterfaceMock},
        {provide: 'DataInterface', useClass: DataInterfaceMock}
       ]
    }).compileComponents();
    socketRoomsService = TestBed.get(SocketRoomService);
    socket = TestBed.get(Socket);
    redirect = TestBed.get('RedirectionInterface');
    dataInt = TestBed.get('DataInterface');
  });

  it('should create the socketrooms service', () => {
    expect(socketRoomsService).toBeTruthy();
  });

  describe('listenToDisconnection method', () => {
    it('should be called by default', () => {
      spyOn(SocketRoomService.prototype, 'listenToDisconnection');
      const componentInstance = new SocketRoomService(new Socket({url: 'test'}), null, null);
      expect(SocketRoomService.prototype.listenToDisconnection).toHaveBeenCalled();
      expect(componentInstance).toBeTruthy();
    });

    it('should listen to socket disconnection', () => {
      spyOn(socket, 'on');
      socketRoomsService.listenToDisconnection();
      expect(socket.on).toHaveBeenCalledWith('disconnect', jasmine.any(Function));
    });

    it('should redirect to / when socket is on', () => {
      spyOn(redirect, 'redirectTo');
      socketRoomsService.listenToDisconnection();
      socket.emit('disconnect', '');
      expect(redirect.redirectTo).toHaveBeenCalledWith('/');
    });
  });

  describe('emitUsersLeaveRoomNotif method', () => {
    it('should call emitNotif for leave', () => {
      spyOn(socket, 'emit');
      socketRoomsService.emitUsersLeaveRoomNotif('2020');
      expect(socket.emit).toHaveBeenCalledWith('leaveUserFromRoom', '2020');
    });
  });

  describe('emitRoomNotif method', () => {
    it('should call emitNotif for room', () => {
      spyOn(socket, 'emit');
      localStorage.setItem(LOCAL_STORAGE_ID, 'samet');
      socketRoomsService.emitRoomNotif();
      const reqRoomsObj = {id: 'samet', roomsByPage: 5};
      expect(socket.emit).toHaveBeenCalledWith('reqRooms', reqRoomsObj);
    });
  });

  describe('emitUsersInRoomNotif method', () => {
    it('should call emitNotif for users In room', () => {
      spyOn(socket, 'emit');
      socketRoomsService.emitUsersInRoomNotif('zerzer');
      expect(socket.emit).toHaveBeenCalledWith('reqUsersInRoom', 'zerzer');
    });
  });

});

class SocketMock {
  public executeCallBackTree: {fn: Function, topic: string}[] = [];
  on(eventName: string, callback: Function) {
    this.executeCallBackTree.push({fn: callback, topic: eventName});
  }

  emit(event: string, val: string) {
    this.executeCallBackTree.find(call => call.topic === event).fn();
  }
}

class DataInterfaceMock {

}
class RedirectionInterfaceMock {
  redirectTo(path: string) {

  }
}
