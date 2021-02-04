import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { URLS } from '../../constants/urls.constant';
import { UserModel } from '../../models/user/user.model';

describe('UserService', () => {
  let userService: UserService;
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
    userService = TestBed.get(UserService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should create the ueser service', () => {
    expect(userService).toBeTruthy();
  });

  describe('userName methods', () => {
    it('should set /get  userName', () => {
      userService.setUserName('Hello samet');
      expect(userService.getUserName()).toEqual('Hello samet');
    });
  });

  describe('getLoggedUser Method', () => {
    const loggedUserUrl = 'http://localhost:3000/users';
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should send get request for logged user', () => {
      userService.getLoggedUser().subscribe(() => {
        expect(req.request.method).toEqual('GET');
      });
      const req = httpTestingController.expectOne(loggedUserUrl);
      req.flush({} as UserModel);
    });

    it('should get request as logged user model', () => {
      const userModel = {} as UserModel;
      userModel._id = '123456';
      userModel.pseudo = 'samet';
      userService.getLoggedUser().subscribe((user) => {
        expect(user._id).toEqual('123456');
        expect(user.pseudo).toEqual('samet');
      });
      const req = httpTestingController.expectOne(loggedUserUrl);
      req.flush(userModel);
    });
  });

  describe('disconnectUser Method', () => {
    const loggedUserUrl = 'http://localhost:3000/users';
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should send delete request for disconnect user', () => {
      userService.disconnectUser().subscribe(() => {
        expect(req.request.method).toEqual('DELETE');
      });
      const req = httpTestingController.expectOne(loggedUserUrl);
      req.flush({});
    });
  });


  describe('addUserByPseudo Method', () => {
    const loggedUserUrl = 'http://localhost:3000/users';
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should send post request for add user', () => {
      userService.addUserByPseudo('samet').subscribe(() => {
        expect(req.request.method).toEqual('POST');
      });
      const req = httpTestingController.expectOne(loggedUserUrl);
      req.flush({});
    });

    it('should send body new UserModel for request for add user', () => {
      userService.addUserByPseudo('samet').subscribe(() => {
        expect(req.request.body.pseudo).toEqual('samet');
      });
      const req = httpTestingController.expectOne(loggedUserUrl);
      req.flush({});
    });

    it('should get response after adding user', () => {
      const userModel = {} as UserModel;
      userModel._id = '123456';
      userModel.pseudo = 'sametresponse';
      userService.addUserByPseudo('samet').subscribe((user) => {
        expect(user._id).toEqual('123456');
        expect(user.pseudo).toEqual('sametresponse');
      });
      const req = httpTestingController.expectOne(loggedUserUrl);
      req.flush(userModel);
    });
  });

});
