import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { URLS } from '../../constants/urls.constant';
import { UserModel } from '../../models/user/user.model';
import { RoomsService } from './rooms.service';
import { RoomModel } from '../../models/room/room.model';
import { RoomsResultModel } from '../../models/room/rooms-result.model';
import { RoomsHelper } from './room.service.spec.helper';

describe('RoomsService', () => {
  let roomsService: RoomsService;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'API_BASE_URL',
          useValue: environment.baseUrl
        }, {
          provide: 'API_URLS',
          useValue: URLS
        }]
    }).compileComponents();
    roomsService = TestBed.get(RoomsService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should create the rooms service', () => {
    expect(roomsService).toBeTruthy();
  });

  describe('roomName methods', () => {
    it('should set /get  userName', () => {
      roomsService.setRoomName('Hello samet room');
      expect(roomsService.getRoomName()).toEqual('Hello samet room');
    });
  });

  describe('addRoom Method', () => {
    const roomsUrl = 'http://localhost:3000/rooms';
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should send post request for adding room', () => {
      roomsService.addRoom('room name').subscribe(() => {
        expect(req.request.method).toEqual('POST');
      });
      const req = httpTestingController.expectOne(roomsUrl);
      req.flush({} as RoomModel);
    });

    it('should send post request with body for adding room', () => {
      roomsService.addRoom('room name').subscribe(() => {
        expect(req.request.body.name).toEqual('room name');
      });
      const req = httpTestingController.expectOne(roomsUrl);
      req.flush({} as RoomModel);
    });

    it('should get response after adding user', () => {
      roomsService.addRoom('room name').subscribe((room) => {
        expect(room._id).toEqual('123456');
        expect(room.name).toEqual('room samet');
        expect(room.createdByUserId).toEqual('987654t');
        expect(room.users[0].pseudo).toEqual('samet');
      });
      const req = httpTestingController.expectOne(roomsUrl);
      const roomModel = {} as RoomModel;
      roomModel._id = '123456';
      roomModel.name = 'room samet';
      roomModel.createdByUserId = '987654t';
      roomModel.users = [{pseudo: 'samet'} as UserModel];
      req.flush(roomModel);
    });
  });

  describe('getRoomsByPage Method', () => {
    const roomsUrl = 'http://localhost:3000/rooms';
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should send get request for rooms list paginated', () => {
      roomsService.getRoomsByPage(0, 10).subscribe(() => {
        expect(req.request.method).toEqual('GET');
      });
      const req = httpTestingController.expectOne(`${roomsUrl}?start=0&end=10`);
      req.flush({} as RoomModel);
    });

    it('should get roomsResultModel', () => {
      const roomsResult = {} as RoomsResultModel;
      roomsResult.total = 2;
      roomsResult.rooms = [new RoomsHelper().room1, new RoomsHelper().room3];
      roomsService.getRoomsByPage(0, 10).subscribe((res) => {
        expect(res.total).toEqual(2);
        expect(res.rooms[0]._id).toEqual('wxcccc');
        expect(res.rooms[0].name).toEqual('room1');
        expect(res.rooms[0].createdByUserId).toEqual('54654');
        expect(res.rooms[0].createdBy).toEqual('samet');
        expect(res.rooms[0].users[0]._id).toEqual('54654');
        expect(res.rooms[0].users[1]._id).toEqual('54699');
        expect(res.rooms[1]._id).toEqual('zersssszer');
        expect(res.rooms[1].name).toEqual('room3');
        expect(res.rooms[1].createdByUserId).toEqual('54656');
        expect(res.rooms[1].createdBy).toEqual('yasmine');
        expect(res.rooms[1].users[0]._id).toEqual('54654');
        expect(res.rooms[1].users[1]._id).toEqual('5254');
        expect(res.rooms[1].users[2]._id).toEqual('54699');
      });
      const req = httpTestingController.expectOne(`${roomsUrl}?start=0&end=10`);
      req.flush(roomsResult);
    });
  });

  describe('deleteRoom Method', () => {
    const roomsUrl = 'http://localhost:3000/rooms';
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should send delete room request', () => {
      roomsService.deleteRoom('123456', '10').subscribe(() => {
        expect(req.request.method).toEqual('DELETE');
      });
      const req = httpTestingController.expectOne(`${roomsUrl}?id=123456&user=10`);
      req.flush({} as RoomModel);
    });

    it('should return roomsResultModel', () => {
      const roomsResult = {} as RoomsResultModel;
      roomsResult.total = 1;
      roomsResult.rooms = [new RoomsHelper().room2];
      roomsService.deleteRoom('123456', '10').subscribe((resAfterDel) => {
        expect(resAfterDel.rooms[0]._id).toEqual('fggggdfdf');
        expect(resAfterDel.rooms[0].createdByUserId).toEqual('54655');
        expect(resAfterDel.rooms[0].name).toEqual('room2');
        expect(resAfterDel.rooms[0].createdBy).toEqual('samet');
        expect(resAfterDel.total).toEqual(1);
      });
      const req = httpTestingController.expectOne(`${roomsUrl}?id=123456&user=10`);
      req.flush(roomsResult);
    });
  });

  describe('addUserToRoom Method', () => {
    const roomsAccessUrl = 'http://localhost:3000/rooms/access';
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should send post to add user to room', () => {
      roomsService.addUserToRoom('fggggdfdf').subscribe(() => {
        expect(req.request.method).toEqual('POST');
      });
      const req = httpTestingController.expectOne(`${roomsAccessUrl}/fggggdfdf`);
      req.flush({});
    });

    it('should send body to add user to room', () => {
      roomsService.addUserToRoom('fggggdfdf').subscribe(() => {
        expect(req.request.body).toEqual({});
      });
      const req = httpTestingController.expectOne(`${roomsAccessUrl}/fggggdfdf`);
      req.flush({});
    });
  });

  describe('removeUserFromRoom Method', () => {
    const roomsAccessUrl = 'http://localhost:3000/rooms/access';
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should send delete to remove user from room', () => {
      roomsService.removeUserFromRoom('zersssszer').subscribe(() => {
        expect(req.request.method).toEqual('DELETE');
      });
      const req = httpTestingController.expectOne(`${roomsAccessUrl}/zersssszer`);
      req.flush({});
    });

    it('should send body to remove user from room', () => {
      roomsService.addUserToRoom('zersssszer').subscribe(() => {
        expect(req.request.body).toEqual({});
      });
      const req = httpTestingController.expectOne(`${roomsAccessUrl}/zersssszer`);
      req.flush({});
    });
  });
});

