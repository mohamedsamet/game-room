import { TestBed } from '@angular/core/testing';
import {SocketRoomService} from "./socket-room.service";
import {Socket} from "ngx-socket-io";
import {RedirectionInterface} from "../../interfaces/utilities/redirection/redirection.interface";
import {DataInterface} from "../../interfaces/utilities/data.interface";
import {Observable, of, Subject} from "rxjs";
import {LOCAL_STORAGE_ID} from "../../constants/rooms.constant";
import {UserInRoomResultModel} from "../../models/user/user-in-room-result.model";
import {UserModel} from "../../models/user/user.model";
import {RoomsResultModel} from "../../models/room/rooms-result.model";
import {RoomModel} from "../../models/room/room.model";
import {RoomsHelper} from "../../tests-spec-mocks/helpers/room.service.spec.helper";
import {SocketMock} from "../../tests-spec-mocks/socket.mock";
import {RedirectionInterfaceMock} from "../../tests-spec-mocks/redirection.mock";
import {DataInterfaceMock} from "../../tests-spec-mocks/data.mock";

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

  describe('getUsersInRoomNotif method', () => {
    it('should call emitRoomNotif', () => {
      spyOn(socketRoomsService, 'emitUsersInRoomNotif');
      socketRoomsService.getUsersInRoomNotif('zerzer');
      expect(socketRoomsService.emitUsersInRoomNotif).toHaveBeenCalledWith('zerzer');
    });

    it('should call getDataFromEvent from data interface', () => {
      spyOn(dataInt, 'getDataFromEvent');
      socketRoomsService.getUsersInRoomNotif('zerzer');
      expect(dataInt.getDataFromEvent).toHaveBeenCalledWith(jasmine.any(Observable));
    });

    it('should return data from socket', (done) => {
      const expectedKeysForUsersInRoom: string[] = ['users', 'roomId'].sort();
      const expectedKeysForUser: string[]= ['_id', 'pseudo'];
      socketRoomsService.getUsersInRoomNotif('zerzer').subscribe(res => {
        expect(res.roomId).toEqual('zerzer');
        expect(res.users[0]._id).toEqual('8888');
        expect(res.users[0].pseudo).toEqual('samet');
        expect(Object.keys(res).sort()).toEqual(expectedKeysForUsersInRoom);
        expect(Object.keys(res.users[0]).sort()).toEqual(expectedKeysForUser);
        done();
      });
    });
  });

  describe('getRoomsSockNotif method', () => {
    it('should call emitRoomNotif', () => {
      spyOn(socketRoomsService, 'emitRoomNotif');
      socketRoomsService.getRoomsSockNotif();
      expect(socketRoomsService.emitRoomNotif).toHaveBeenCalled();
    });

    it('should call getDataFromEvent from data interface', () => {
      spyOn(dataInt, 'getDataFromEvent');
      socketRoomsService.getRoomsSockNotif();
      expect(dataInt.getDataFromEvent).toHaveBeenCalledWith(jasmine.any(Observable));
    });

    it('should return data from socket', (done) => {
      const expectedKeysForRoomsResult: string[] = ['total', 'rooms'].sort();
      const expectedKeysForRoom: string[] = ['_id', 'name', 'createdByUserId', 'users', 'createdBy'].sort();
      socketRoomsService.getRoomsSockNotif().subscribe(res => {
        expect(res.total).toEqual(1);
        expect(res.rooms[0].name).toEqual('room2');
        expect(res.rooms[0]._id).toEqual('fggggdfdf');
        expect(res.rooms[0].createdBy).toEqual('samet');
        expect(res.rooms[0].users[0]._id).toEqual('5254');
        expect(res.rooms[0].createdByUserId).toEqual('54655');
        expect(res.rooms[0].users[0].pseudo).toEqual('yasmine');
        expect(Object.keys(res).sort()).toEqual(expectedKeysForRoomsResult);
        expect(Object.keys(res.rooms[0]).sort()).toEqual(expectedKeysForRoom);
        done();
      });
    });
  });

});
