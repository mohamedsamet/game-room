import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomComponent } from './room.component';
import { UserInRoomComponentMock } from '../../../tests-spec-mocks/components-mock/user-in-room.component.mock';
import { ChatBoxComponentMock } from '../../../tests-spec-mocks/components-mock/chat-box.component.mock';
import { ActivatedRoute } from '@angular/router';
import { RedirectionInterfaceMock } from '../../../tests-spec-mocks/redirection.mock';
import { RoomAccessMock } from '../../../tests-spec-mocks/room-access.mock';
import { EmitRoomsMock } from '../../../tests-spec-mocks/emit-rooms.mock';
import { GetUsersInRoomNotifMock } from '../../../tests-spec-mocks/get-users-in-room-notif.mock';
import { ManageRoomsMock } from '../../../tests-spec-mocks/manage-rooms.mock';

describe('RoomComponent', () => {
  let fixture: ComponentFixture<RoomComponent>;
  let roomComponent: RoomComponent;
  let redirectInt: RedirectionInterfaceMock;
  let roomAccess: RoomAccessMock;
  let emitRoomsNotifInterface: EmitRoomsMock;
  let getUsersInRoomNotifInterface: GetUsersInRoomNotifMock;
  let manageRoomsMock: ManageRoomsMock;
  let activeRoute = {snapshot: {paramMap: {get: (x) => {return 'room1'}}}} as ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RoomComponent,
        UserInRoomComponentMock,
        ChatBoxComponentMock
      ],
      providers: [
        {provide: ActivatedRoute, useValue: activeRoute},
        {provide: 'RedirectionInterface', useClass: RedirectionInterfaceMock},
        {provide: 'RoomAccessInterface', useClass: RoomAccessMock},
        {provide: 'EmitRoomsNotifInterface', useClass: EmitRoomsMock},
        {provide: 'GetUsersInRoomNotifInterface', useClass: GetUsersInRoomNotifMock},
        {provide: 'ManageRoomsInterface', useClass: ManageRoomsMock},

      ]
    }).compileComponents();
    fixture = TestBed.createComponent(RoomComponent);
    redirectInt = TestBed.get('RedirectionInterface');
    roomAccess = TestBed.get('RoomAccessInterface');
    emitRoomsNotifInterface = TestBed.get('EmitRoomsNotifInterface');
    getUsersInRoomNotifInterface = TestBed.get('GetUsersInRoomNotifInterface');
    manageRoomsMock = TestBed.get('ManageRoomsInterface');
    roomComponent = fixture.componentInstance;
  });

  it('should create room component', () => {
    expect(roomComponent).toBeTruthy();
  });

  describe('ngOnInit / ngOnDestroy method', () => {
    it('should call addUserInRoom method', () => {
      spyOn(roomComponent, 'addUserInRoom');
      roomComponent.ngOnInit();
      expect(roomComponent.addUserInRoom).toHaveBeenCalled();
    });

    it('should call getRoomName method', () => {
      spyOn(roomComponent, 'getRoomName');
      roomComponent.ngOnInit();
      expect(roomComponent.getRoomName).toHaveBeenCalled();
    });

    it('should call getOutFromRoom method on destroy', () => {
      spyOn(roomComponent, 'getOutFromRoom');
      roomComponent.ngOnDestroy();
      expect(roomComponent.getOutFromRoom).toHaveBeenCalled();
    });
  });

  describe('getRoomName method', () => {
    it('should set roomName', () => {
      roomComponent.getRoomName();
      expect(roomComponent.roomName).toEqual('room1')
    });
  });

  describe('addUserInRoom', () => {
    it('should set roomId from active route', () => {
      roomComponent.addUserInRoom();
      expect(roomComponent.roomId).toEqual('room1');
    });

    it('should call addUserInRoom from int', () => {
      spyOn(roomAccess, 'addUserToRoom').and.callThrough();
      roomComponent.addUserInRoom();
      expect(roomAccess.addUserToRoom).toHaveBeenCalledWith('room1');
    });

    it('should call emitRoomNotif from int', () => {
      spyOn(emitRoomsNotifInterface, 'emitRoomNotif').and.callThrough();
      roomComponent.addUserInRoom();
      expect(emitRoomsNotifInterface.emitRoomNotif).toHaveBeenCalled();
    });

    it('should call getUsersConnected', () => {
      spyOn(roomComponent, 'getUsersConnected').and.callThrough();
      roomComponent.addUserInRoom();
      expect(roomComponent.getUsersConnected).toHaveBeenCalled();
    });

    it('should call goBack if service return error', () => {
      spyOn(roomComponent, 'goBack').and.callThrough();
      roomAccess.setError(true);
      roomComponent.addUserInRoom();
      expect(roomComponent.goBack).toHaveBeenCalled();
    });
  });

  describe('getUsersConnected method', () => {
    it('should call getUsersInRoomNotif from int', () => {
      roomComponent.roomId = 'room2';
      spyOn(getUsersInRoomNotifInterface, 'getUsersInRoomNotif').and.callThrough();
      roomComponent.getUsersConnected();
      expect(getUsersInRoomNotifInterface.getUsersInRoomNotif).toHaveBeenCalledWith('room2');
    });

    it('should set userConnected', () => {
      roomComponent.roomId = 'room2';
      roomComponent.getUsersConnected();
      const expectedUserKeys = ['pseudo', '_id'].sort();
      expect(Object.keys(roomComponent.usersConnected[0]).sort()).toEqual(expectedUserKeys);
      expect(roomComponent.usersConnected[0]._id).toEqual('54654');
      expect(roomComponent.usersConnected[0].pseudo).toEqual('samet');
      expect(roomComponent.usersConnected[1]._id).toEqual('5254');
      expect(roomComponent.usersConnected[1].pseudo).toEqual('yasmine');
      expect(roomComponent.usersConnected[2]._id).toEqual('54699');
      expect(roomComponent.usersConnected[2].pseudo).toEqual('marwa');
    });
  });

  describe('getOutFromRoom method', () => {
    it('should call removeUserFromRoom from int', () => {
      spyOn(roomAccess, 'removeUserFromRoom').and.callThrough();
      roomComponent.roomId = 'room2';
      roomComponent.getOutFromRoom();
      expect(roomAccess.removeUserFromRoom).toHaveBeenCalledWith('room2');
    });

    it('should call emitRoomNotif from int', () => {
      spyOn(emitRoomsNotifInterface, 'emitRoomNotif').and.callThrough();
      roomComponent.roomId = 'room2';
      roomComponent.getOutFromRoom();
      expect(emitRoomsNotifInterface.emitRoomNotif).toHaveBeenCalled();
    });

    it('should call emitUsersLeaveRoomNotif from int', () => {
      spyOn(getUsersInRoomNotifInterface, 'emitUsersLeaveRoomNotif').and.callThrough();
      roomComponent.roomId = 'room2';
      roomComponent.getOutFromRoom();
      expect(getUsersInRoomNotifInterface.emitUsersLeaveRoomNotif).toHaveBeenCalledWith('room2');
    });
  });

  describe('goBack method', () => {
    it('should call redirectTo from int', () => {
      spyOn(redirectInt, 'redirectTo');
      roomComponent.goBack();
      expect(redirectInt.redirectTo).toHaveBeenCalledWith('../', activeRoute);
    });
  });
});
